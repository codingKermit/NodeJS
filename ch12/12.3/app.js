const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const pageRouter = require('./routes');


dotenv.config();

const app = express();

app.set('port',process.env.PORT || 8005);
app.set('view engine','html');
nunjucks.configure('views',{
    express: app,
    watch : true
});

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'public')));

app.use('/img',express.static(path.join(__dirname,'uploads')));
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

app.use('/',pageRouter);


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

module.exports = app;