const express = require('express'); // 익스프레스 모듈을 require하여 받습니다.
const path = require('path'); // 경로 관리를 위한 모듈 path 도 받습니다.
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
const {urlencoded} = require("express");

const app = express(); // express application을 생성합니다.

app.set('port',process.env.PORT | 3000); // 포트를 설정합니다

// morgan은 전달된 인수에 따라 로그 형식이 달라집니다
app.use(morgan('dev'));

// 서명키를 인수로 전달할 수도 있으며 여기서는 간단한 예시로 넣었습니다
app.use(cookieParser('secret'));
// app.use(cookieParser()); // 인수 전달 업싱도 쓸 수는 있습니다.


/*
* 다음의 두 미들웨어는 bodyParser 대체하는 미들웨어입니다.
* */

// json 데이터를 파싱할 때 사용
app.use(express.json());

// form 데이터를 파싱할 때 사용
// extended true -> qs 모듈 사용, extended false -> queryString 모듈 사용
app.use(urlencoded({ extended: true }));

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

app.get('/setCookie',(req,res,next)=>{
    /*
     *  쿠키를 저장합니다.
     *  키,값,옵션 순서의 인수를 가집니다
     * 이 쿠키에는 서명을 붙이지 않았습니다
    */
    res.cookie('name','존!!!시나!!!',{
        httpOnly:true,
        expires : new Date(Date.now()+10000),
        path : '/'
    });

    res.cookie('age','히미츠',{
        httpOnly:true,
        expires : new Date(Date.now()+10000),
        path:'/',
        signed : true
    })

    res.send('쿠키가 설정되었습니다')
})

app.get('/getCookie',(req,res,next)=>{
    console.log('Cookies : ',req.cookies); // cookie-parser 모듈에 의해 쿠키 정보가 정리되어 나옵니다

    console.log('Signed Cookies :',req.signedCookies); // 서명이 붙은 쿠키 정보를 가져옵니다.

    res.send(`name : ${req.cookies.name}<br> age : ${req.signedCookies.age}`);
})

app.get('/clearCookie',(req,res,next)=>{
    res.clearCookie();

    res.send('쿠키가 삭제되었습니다');
})

app.get('/',(req,res,next)=>{ // GET 방식의 / 에 대한 응답을 설정합니다.






	/*
	 * html 파일을 제공할 경우 sendFile() 을 사용합니다.
	 * 이 때 내부적으로는 fs 모듈의 기능을 사용합니다.
	*/
    res.sendFile(path.join(__dirname,'index.html'));

    /*
     * next의 사용 방법 중 특수한 경우가 인수로 'route' 라는 문자열을 전달하는 경우
     * 현재의 예시처럼 / 로 연결되는 라우터가 2개 있는 상황일 때 
     * next('route') 는 다음의 미들웨어로 가는 것이 아니라 다음 라우터를 찾아서 이동하게 됩니다
    */
   // if(true){
   //  next('route') // 다음 라우터를 찾아갑니다
   // }else{
   //  next(); // 다음 미들웨어로 갑니다
   // }
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
app.use((req,res,next)=>{
    res.status(404).send('<h1>해당하는 URI가 없네요...</h1>');
})



/* 에러 처리 미들웨어입니다.
 * listen()을 수행하기 직전에 작성합니다.
 * status 500 에러임을 명시합니다. 설정하지 않을 경우 기본값(200) 으로 전달됩니다
 */
app.use((err,req,res,next)=>{
    console.error(err);
    res.status(500).send('<h1>에러가 났어요...</h1>')
})

app.listen(3000,()=>{
    console.log('익스프레스 서버 대기중')
})