const express = require('express'); // 익스프레스 모듈을 require하여 받습니다.
const path = require('path'); // 경로 관리를 위한 모듈 path 도 받습니다.
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
const {urlencoded} = require("express");
const session = require('express-session');
const dotenv = require('dotenv');

dotenv.config();

const app = express(); // express application을 생성합니다.



app.set('port',process.env.PORT | 3000); // 포트를 설정합니다

// morgan은 전달된 인수에 따라 로그 형식이 달라집니다
app.use(morgan('dev'));

app.use(cookieParser(process.env.COOKIE_SECRET));
// app.use(cookieParser()); // 인수 전달 업싱도 쓸 수는 있습니다.


/*
* 다음의 두 미들웨어는 bodyParser 대체하는 미들웨어입니다.
* */

// json 데이터를 파싱할 때 사용
app.use(express.json());

/*  form 데이터를 파싱할 때 사용
- extended true -> qs 모듈 사용,
- extended false -> queryString 모듈 사용
*/
app.use(urlencoded({ extended: true }));


/*
express의 static 모듈을 사용하면
정적 파일을 제공할 때 실제 경로와 요청 경로를 상이하게 할 수 있습니다.
예시) app.use('/',express.static(__dirname+'public')); 를 설정했을 경우

요청 경로 : express/index.html
실제 경로 : express/public/index.html
* */
app.use('/',express.static(__dirname+'/public'));


app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie:{
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1일
    }
}));


/********************************** 미들웨어 모듈 설정 종료 **********************************************/

/* use()는 미들웨어를 장착하는 함수로써 세번째 인자인 next를 필수로 사용해야합니다.
 * next()를 사용하지 않으면 다음으로 넘어가지 않아 미들웨어까지의 동작만 하고 멈추게 됩니다.
 * 여기서 다음이란 라우터를 찾는 행위 뿐만 아닌 다음 미들웨어로 넘어가는 동작을 포함합니다.
 */
app.use((req,res,next)=>{ //세번째 인자인 next 존재 확인
    next(); // 다음 미들웨어 호출
}, (req,res,next)=>{ 
    next(); // 다음 미들웨어 호출
},(req,res,next)=>{ 
    next(); // 다음 미들웨어가 없기 때문에 라우터를 찾음
})

/*
 * 위의 use에서는 모든 라우터에 대한 미들웨어를 사용했지만
 * 여기서는 '/about' 으로 오는 요청에 대해서만 동작하는 미들웨어 입니다.
 */
app.use('/about',(req,res,next)=>{
    next();
},(req,res,next)=>{ // 여기서는 에러를 발생시키는 예시입니다
    try {
        console.log(없는변수); // 강제 에러 발생
    } catch (error) {
        next(error); // next에 인수가 전달되는 경우 에러 처리 미들웨어로 바로 넘어감
    }

})

app.get('/setCookie',(req,res)=>{
    /*
     *  쿠키를 저장합니다.
     *  키,값,옵션 순서의 인수를 가집니다
     * 이 쿠키에는 서명을 붙이지 않았습니다
    */
    res.cookie('name','이름',{
        httpOnly:true,
    });

    res.cookie('age','나이',{
        httpOnly:true,
        signed : true
    })

    res.send('쿠키가 설정되었습니다')
})

app.get('/getCookie',(req,res)=>{
    console.log('Cookies : ',req.cookies); // cookie-parser 모듈에 의해 쿠키 정보가 정리되어 나옵니다

    console.log('Signed Cookies :',req.signedCookies); // 서명이 붙은 쿠키 정보를 가져옵니다.

    res.send(`name : ${req.cookies.name}<br> age : ${req.signedCookies.age}`);
})

app.get('/clearCookie/:key',(req,res)=>{

    res.clearCookie(req.params.key,{signed:false});

    res.send(`${req.params.key} (이)가 삭제되었습니다`);
})

app.get('/setSession',(req,res)=>{
    req.session.username = 'username';
    req.session.name = 'name';
    res.send('세션이 초기화 되었습니다');
})
app.get('/getSession',(req,res)=>{
    console.log(req.session);
    res.send(req.sessionID);
})

app.get('/',(req,res)=>{ // GET 방식의 / 에 대한 응답을 설정합니다.

    // 세션 초기화
    req.session.id = 'hello';

    console.log('req.session :',req.session);
    // 요청자에 대한 세션의 id의 값을 hello로 설정함. 이는 모든 사용자에 대한 것이 아닌 해당 사용자에 한함.
    req.session.id = 'hello';
    console.log('req.session.id :',req.session.id);

	/*
	 * html 파일을 제공할 경우 sendFile() 을 사용합니다.
	 * sendFile() 은 내부적으로 fs 모듈의 기능을 사용합니다.
	*/
    res.sendFile(path.join(__dirname,'index.html'));

    /*
     * next() 의 사용 방법 중 특수한 경우가 인수로 'route' 라는 문자열을 전달하는 경우
     * 현재의 예시처럼 / 로 연결되는 라우터가 2개 있는 상황일 때 
     * next('route') 는 다음의 미들웨어로 가는 것이 아니라 다음 라우터를 찾아서 이동하게 됩니다
    */

    /*
    // 이 경우 제가 들었던 의문으로 sendFile()을 했는데 또 next()를 하려고 하기 때문에 에러가 발생할거라 생각했습니다.
    // 하지만 에러가 발생하지 않는 이유를 알아보니 next('route')는 다음 라우트로 작업을 이전하기 때문에
    // 해당 라우트에서는
    if(true){
     next('route') // 다음 라우터를 찾아갑니다
    }else{
     next(); // 다음 미들웨어로 갑니다
    }
    */
}, (req,res)=>{
    console.log('next() 했으면 여기로 올겁니다');
})

app.get('/',(req,res)=>{
    console.log("next('route')를 썻기 때문에 여기로 옵니다")
})

app.get('/json',(req,res)=>{
    res.json({key:'value'});
})

app.post('/',(req,res)=>{
    res.send('hello express');
})


app.get('/about',(req,res)=>{
    res.send('hello express');
})

app.get('/category/:name',(req,res)=>{
    res.send(`hello ${req.params.name}`);
})

app.get('/body',(req,res)=>{
    console.log(req.body);
    res.send('hello express');
})


/*
 * 해당하는 라우터가 없을 경우 발생하는 404 페이지에 대응하는 미들웨어 입니다.
 * 에러 핸들링 미들웨어보다는 상단에 위치 하되, 라우터 작성 코드보다는 하단에 작성합니다.
 * status 는 404임을 명시해줍니다. 설정하지 않을 경우 기본값(200) 으로 전달됩니다.
 */
app.use((req,res)=>{
    res.status(404).send('<h1>해당하는 URI가 없네요...</h1>');
})



/* 에러 처리 미들웨어입니다.
 * listen()을 수행하기 직전에 작성합니다.
 * status 500 에러임을 명시합니다. 설정하지 않을 경우 기본값(200) 으로 전달됩니다
 */
app.use((err,req,res)=>{
    console.error(err);
    res.status(500).send('<h1>에러가 났어요...</h1>')
})

app.listen(3000,()=>{
    console.log('익스프레스 서버 대기중')
})