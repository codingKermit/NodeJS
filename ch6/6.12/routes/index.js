const express = require('express');
const path = require('path'); // 경로 관리를 위한 모듈 path 도 받습니다.

const router = express.Router();

/* use()는 미들웨어를 장착하는 함수로써 세번째 인자인 next를 필수로 사용해야합니다.
 * next()를 사용하지 않으면 다음으로 넘어가지 않아 미들웨어까지의 동작만 하고 멈추게 됩니다.
 * 여기서 다음이란 라우터를 찾는 행위 뿐만 아닌 다음 미들웨어로 넘어가는 동작을 포함합니다.
 */
router.use((req,res,next)=>{ //세번째 인자인 next 존재 확인
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
router.use('/about',(req,res,next)=>{
    next();
},(req,res,next)=>{ // 여기서는 에러를 발생시키는 예시입니다
    try {
        console.log(없는변수); // 강제 에러 발생
    } catch (error) {
        next(error); // next에 인수가 전달되는 경우 에러 처리 미들웨어로 바로 넘어감
    }

})

router.get('/setCookie',(req,res)=>{
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

router.get('/getCookie',(req,res)=>{
    console.log('Cookies : ',req.cookies); // cookie-parser 모듈에 의해 쿠키 정보가 정리되어 나옵니다

    console.log('Signed Cookies :',req.signedCookies); // 서명이 붙은 쿠키 정보를 가져옵니다.

    res.send(`name : ${req.cookies.name}<br> age : ${req.signedCookies.age}`);
})

router.get('/clearCookie/:key',(req,res)=>{

    res.clearCookie(req.params.key,{signed:false});

    res.send(`${req.params.key} (이)가 삭제되었습니다`);
})

router.get('/setSession',(req,res)=>{
    req.session.username = 'username';
    req.session.name = 'name';
    res.send('세션이 초기화 되었습니다');
})
router.get('/getSession',(req,res)=>{
    console.log(req.session);
    res.send(req.sessionID);
})

router.get('/',(req,res)=>{ // GET 방식의 / 에 대한 응답을 설정합니다.

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
    res.sendFile(path.join(__dirname,'/..','index.html'));

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

router.get('/',(req,res)=>{
    console.log("next('route')를 썻기 때문에 여기로 옵니다")
})

router.get('/json',(req,res)=>{
    res.json({key:'value'});
})

router.post('/',(req,res)=>{
    res.send('hello express');
})


router.get('/about',(req,res)=>{
    res.send('hello express');
})

router.get('/category/:name',(req,res)=>{
    res.send(`hello ${req.params.name}`);
})

router.get('/body',(req,res)=>{
    console.log(req.body);
    res.send('hello express');
})

module.exports = router;