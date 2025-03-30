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
    
     /**
     * @openapi
     * /v2/token:
     *   get:
     *     security:
     *       - Authorization: []
     *     description: 토큰 생성
     *     parameters:
     *     - in: query
     *       name : secretKey
     *       required: true
     *       schema: 
     *         type: string
     *     responses:
     *       200:
     *         description: 생성된 토큰.
     *       400:
     *         description: 비밀키 누락
     */
    router.get('/token', apiLimiter, createToken);
    
    /**
     * @openapi
     * /v2/token:
     *   post:
     *     security:
     *       - Authorization: []
     *     description: 토큰 생성
     *     requestBody:
     *       description: 비밀키
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/secretKey'
     *     responses:
     *       200:
     *         description: 생성된 토큰
     *       400:
     *         description: 비밀키 누락
     */
    router.post('/token', apiLimiter, createToken);
    
    /**
     * @openapi
     * /v2/test:
     *   get:
     *     description: 토큰 확인
     *     summary: 토큰 확인
     *     security:
     *       - Authorization: []
     *     responses:
     *       200:
     *         description: 디코딩된 토큰.
     *       401:
     *         description: Unauthorized
     */
    router.get('/test', verifyToken, apiLimiter,tokenTest);
    

    /**
     * @openapi
     * /v2/posts/my:
     *   get:
     *     description: 사용자의 게시글 조회
     *     security:
     *       - Authorization: []
     *     responses:
     *       200:
     *         description: 사용자의 게시글.
     */
    router.get('/posts/my',verifyToken,apiLimiter,getMyPosts);
    
    /**
     * @openapi
     * /v2/posts/hashtag/:title:
     *   get:
     *     description: 해시태그로 게시글 조회
     *     parameters:
     *     - in: path
     *       name: title
     *       schema:
     *         type: string
     *     security:
     *       - Authorization: []
     *     responses:
     *       200:
     *         description: 해시태그가 포함된 게시글
     */
    router.get('/posts/hashtag/:title',verifyToken,apiLimiter,getPostsByHashtag);
    
    /**
     * @openapi
     * /v2/followers:
     *   get:
     *     description: 사용자의 팔로워 목록
     *     security:
     *       - Authorization: []
     *     responses:
     *       200:
     *         description: 사용자의 팔로워 목록
     */
    router.get('/followers',verifyToken,apiLimiter,getFollowers);
    
    /**
     * @openapi
     * /v2/followings:
     *   get:
     *     description: 사용자를 팔로우 하는 유저 목록
     *     security:
     *       - Authorization: []
     *     responses:
     *       200:
     *         description: 사용자를 팔로우 하는 유저 목록
     */
    router.get('/followings',verifyToken,apiLimiter,getFollowings);
    
    module.exports = router;