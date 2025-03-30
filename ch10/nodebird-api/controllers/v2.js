const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Domain = require('../models/domain');
const Post = require('../models/post');
const Hashtag = require('../models/hashtag');
const { Op } = require('sequelize');

exports.createToken = async (req,res,next) => {
    let secretKey = null;
    
    if(req.method === 'GET'){
        secretKey = req.query.secretKey ?? null;
    } else {
        secretKey = req.body.secretKey ?? null;
    }

    if(!secretKey){
        return res.status(400).json({
            code:400,
            message : "비밀키(secretKey)는 필수 값 입니다."
        })
    }

    try {
        const domain = await Domain.findOne({
            where:{[Op.or]:[{clientSecret:secretKey},{serverSecret:secretKey}]},
            include:[
                {
                    model:User,
                    attributes:['id','nickname']
                }
            ]
        });

        console.log('domain : ', domain);

        if(!domain){
            return res.status(401).json({
                code:401,
                message : '등록되지 않은 도메인입니다.'
            })
        };

        const token = jwt.sign({
            id : domain.User.id,
            nickname : domain.User.nickname
        },process.env.JWT_SECRET,{
            expiresIn:'10m',
            issuer:'nodebird'
        });

        return res.json({
            code:200,
            message:'토큰이 발급되었습니다',
            token
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code : 500,
            message : '서버 에러'
        });
    };
};

exports.tokenTest = async (req,res,next) => {
    res.json(res.locals.decoded);
};

exports.getMyPosts = async (req,res,next) => {
    
    const {id} = res.locals.decoded; // verifyToken 미들웨어에서 처리한 token 정보

    // 방법1. async/await 사용
    try {
        const posts = await Post.findAll({where:{UserId:id}});
        return res.status(200).json({
            code:200,
            payload:posts
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code : 500,
            message : '서버 에러'
        });
    };

    // 방법2. Promise 사용
    // Post.findAll({where:{UserId:id}})
    // .then((posts)=>{
    //     return res.json({
    //         code : 200,
    //         payload:posts
    //     })
    // })
    // .catch((err)=>{
    //     return res.status(500).json({
    //         code:500,
    //         message:'서버 에러'
    //     })
    // })
};

exports.getPostsByHashtag = async (req,res,next) => {
    const title = req.params.title;

    try {
        const hashtag = await Hashtag.findOne({where:{title}});
        
        if(!hashtag){
            return res.status(404).json({
                code : 404,
                message : '검색 결과가 없습니다'
            });
        };

        const posts = await hashtag.getPosts() || [];

        return res.status(200).json({
            code:200,
            payload:posts
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code:500,
            message:'서버 에러'
        });
    }
};

exports.getFollowers = async (req,res,next) => {
    const id = res.locals.decoded?.id ?? null;

    try {
        const user = await User.findOne({where:{id}});
        if(!user){
            return res.status(404).json({
                code:404,
                message:'존재하지 않는 회원입니다.'
            });
        };
    
        const followers = await user.getFollowers() || [];
        
        return res.status(200).json({
            code : 200,
            payload:followers
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code : 500,
            message : '서버 에러'
        });
    }


};

exports.getFollowings = async(req,res,next) =>{
    const id = res.locals.decoded?.id ?? null;

    try {
        const user = await User.findOne({where:{id}});
        if(!user){
            return res.status(404).json({
                code:404,
                message:'존재하지 않는 회원입니다.'
            });
        };
    
        const followings = await user.getFollowings() || [];

        return res.status(200).json({
            code :200,
            payload:followings
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code : 500,
            message : '서버 에러'
        });
    }
};