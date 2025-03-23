const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const models = require('./models');
const sequelize = models.sequelize;
const passport = require('passport');
const passportConfig = require('./passport');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

dotenv.config();

const authRouter = require('./routes/auth');
const indexRouter = require('./routes');
const v1Router = require('./routes/v1');
const v2Router = require('./routes/v2');

const app = express();
passportConfig();

app.set('port',process.env.PORT || 8002);
app.set('view engine','html');
nunjucks.configure('views',{
    express: app,
    watch : true
});

sequelize.sync({force:false})
.then(()=>{
    console.log('연결 성공');
})
.catch((err)=>{
    console.error(err);
})

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'public')));

app.use(express.json()); // ajax json 요청을 req.body 에 저장
app.use(express.urlencoded({extended:false})); // formData 를 req.body 에 저장
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false
    }
}));

/**
 * session 설정 이후에 passport 사용 설정
 * 라우터보다는 먼저 사용되어야함.
 */
app.use(passport.initialize()); // req.user, req.login, req.logout req.isAuthticate 함수 생성
app.use(passport.session()); // connect.sid 이름으로 세션 쿠키를 클라이언트로 전달

app.use('/auth',authRouter);
app.use('/',indexRouter);
app.use('/v1',v1Router);
app.use('/v2',v2Router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req,res,next)=>{
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err,req,res,next)=>{
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'),()=>{
    console.log(app.get('port'),'번 포트에서 대기 중');
});