const express = require('express');
const morgan = require('morgan');
const path = require('path');
const nunjucks = require('nunjucks');

const {sequelize} = require('./models');


const app = express();

app.set('view engine','html');
app.set('port',process.env.PORT || 3001);
nunjucks.configure('Views',{
    express:app,
    watch:true
})


// 설정한 DB에 연결
sequelize.sync({ force : true })
    .then(()=>{
        console.log('연결 성공');
    })
    .catch((err)=>{
        console.error(err);
    });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
