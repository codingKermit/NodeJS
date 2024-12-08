const express = require('express'); // 익스프레스 모듈을 require하여 받습니다.
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
const {urlencoded} = require("express");
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const nunjucks = require('nunjucks');

dotenv.config();

const indexRouter = require('./routes');
const userRouter = require('./routes/user');

const app = express(); // express application을 생성합니다.

app.set('port',process.env.PORT | 3000); // 포트를 설정합니다
app.set('view engine','html');

nunjucks.configure('views',{
    express:app,
    watch:true
})

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

app.use('/',indexRouter);
app.use('/user',userRouter);


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