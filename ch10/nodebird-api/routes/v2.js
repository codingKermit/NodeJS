const express = require('express');
const { tokenTest, createToken, getMyPosts, getPostsByHashtag, getFollowers, getFollowings } = require('../controllers/v2');
const { verifyToken,apiLimiter,corsDomain } = require('../middlewares');
const router = express.Router();

// 아래처럼 직접 response에 헤더를 추가할 수도 있지만 너무 다양한 경우가 있어서 힘듬
// router.use((req,res,next)=>{
    //     res.setHeader('Access-Control-Allow-Origin','http://localhost:4000');
    //     res.setHeader('Access-Control-Allow-Headers','content-type');
    //     next();
    // })
    
    router.use(corsDomain);
    
    // all 사용시 swagger-autogen 미들웨어가 자동생성하지 않아서 get, post 분리
    router.get('/token', apiLimiter, createToken);
    router.post('/token', apiLimiter, createToken);
    
    router.get('/test', verifyToken, apiLimiter,tokenTest);
    
    router.get('/posts/my',verifyToken,apiLimiter,getMyPosts);
    router.get('/posts/hashtag/:title',verifyToken,apiLimiter,getPostsByHashtag);
    
    router.get('/followers',verifyToken,apiLimiter,getFollowers);
    router.get('/followings',verifyToken,apiLimiter,getFollowings);
    
    module.exports = router;