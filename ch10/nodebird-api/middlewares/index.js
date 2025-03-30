const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const User = require('../models/user');
const cors = require('cors');
const Domain = require('../models/domain');
const { Op } = require('sequelize');

exports.isLoggedIn = (req,res,next) =>{

    if(req.isAuthenticated()){
        next();
    } else {
        res.status(403).send('로그인 필요'); 
    }
}

exports.isNotLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        next();
    } else {
        const message = encodeURIComponent('로그인한 상태입니다.');
        res.status(403).send(`/?error=${message}`);
    }
}

exports.verifyToken = async (req,res,next) =>{
    try {
        const token = req.headers.authorization?.replace('Bearer ','');
        console.log('token : ',token);
        res.locals.decoded = jwt.verify(token,process.env.JWT_SECRET);
        return next();
    } catch (error) {
        console.error('error :', error);
        if(error.name == 'TokenExpiredError'){
            return res.status(419).json({
                code : 419, // 세션 만료 STATUS 인데 강의에서는 임의로 토큰 만료 STATUS로 사용
                message : '토큰이 만료되었습니다.'
            });
        };

        return res.status(401).json({
            code : 401,
            message : '유효하지 않은 토큰입니다.'
        });
    }
};

exports.apiLimiter = async (req,res,next) => {


    const id = res.locals.decoded?.id ?? null;
    
    const secretKey = req.headers.secretkey ?? null;

    const user = await User.findOne({
        where:{id},
        include:{
            model:Domain,
            attributes:['type','host','serverSecret'],
            where:{[Op.or]:[{clientSecret:secretKey},{serverSecret:secretKey}]}
        }
    });

    const type = user?.Domains[0].type;

    const serverClient = user?.Domains[0].serverSecret ? 'server' : 'client';

    const method = req.method;

    if(user != null &&serverClient == 'client' && method != 'GET'){
        const error = new Error('클라이언트 비밀키는 GET 요청만 가능합니다.');
        error.status = 403;
        return next(error);
    }

    const max = type == 'premium' ? 100 : 5;

    res.locals.max = max;

    rateLimiter(req,res,next);
}

const rateLimiter = rateLimit({
    windowMs:60*1000,
    max:(req,res)=>res.locals.max,
    handler(req,res){
        res.status(this.statusCode).json({
            code:this.statusCode,
            message:`1분에 ${res.locals.max} 번만 요청할 수 있습니다.`
        });
    }
})

exports.deprecated = (req,res) => {
    res.status(410).json({
        code:410,
        message:'새로운 버전이 나왔습니다. 새로운 버전을 사용해주세요.'
    })
}

exports.corsDomain = async (req,res,next) =>{

    // const host = new URL(origin).host;
    const host = req.get('host');

    // DB에 저장한 host의 값은 프로토콜을 제외한 값이기 때문에 URL 라이브러리 사용
    const domain = await Domain.findOne({where:{host}});

    if(domain){
        cors({
            /**
             * 허용할 도메인.
             * true : 모든 도메인 허용. 요청 헤더의 origin 값을 그대로 사용.
             * '*' : 모든 도메인 허용. 와일드카드로써 응답 헤더에 * 를 사용.
             * 특정 도메인 : 명시한 도메인만 허용
             */
            origin:true,
            /*
            쿠키 요청 허용 여부.
            이 값이 true일 때에는 origin의 값을 '*' 로 사용할 수 없음
            */
            credentials:true, 
            
        })(req,res,next);
    } else {
        next();
    }
};