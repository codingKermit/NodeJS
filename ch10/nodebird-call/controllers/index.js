const axios = require('axios');

const URL = process.env.API_URL;
axios.defaults.headers.common.origin = process.env.ORIGIN;
axios.defaults.headers.common.secretKey = process.env.SECRET_KEY;



exports.getMyPosts = async (req,res,next) =>{

    try {
        const posts = await request(req,'/posts/my');
        return res.json(posts.data);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.searchByHashtag = async (req,res,next) =>{
    const hashtag = req.params.hashtag;
    
    try {
        /* 
        강의에서는 한글이 입력되는 케이스를 위해 encodeURIComponent 를 사용했지만,
        학습 시점 2025.03.03 에는 별도의 처리 없이도 한글이 바로 지원됨.
        axios 의 버전 차이로 인한 문제라고 유추됨. (자세한 원인 까지는 찾아보지 않았음)
        */
       const posts = await request(req,`/posts/hashtag/${hashtag}`);
       return res.json(posts.data);
    } catch (error) {
        console.error(error);
        next(error);
    }    
};

exports.renderMain = (req,res,next) =>{
    res.render('main',{key:process.env.CLIENT_KEY}); // 클라이언트용 비밀키
}

exports.getFollowers = async (req,res,next) => {
    try {
        const followers = await request(req,'/followers');
        return res.json(followers.data);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.getFollowings = async (req,res,next) => {
    try {
        const followings = await request(req,`/followings`);
        return res.json(followings.data);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const request = async (req,api) => {
    try {
        if(!req.session.jwt){
            const token = await axios.post(`${URL}/token`,{
                secretKey : process.env.SECRET_KEY
            });
            req.session.jwt = token.data.token;
        };

        return await axios.get(`${URL}${api}`,{
            headers:{
                authorization:req.session.jwt
            }
        });
    } catch (error) {
        if(error.response.status === 419){
            delete req.session.jwt;
            return request(req,api); // 에러 발생 시 스스로를 다시 호출하여 토큰 생성
        };
        
        return error.response;
    }
}


exports.test = async (req,res,next)=>{
    try {
        if(!req.session.jwt){
            const token = await axios.post(`${URL}/token`,{
                secretKey : process.env.SECRET_KEY
            });
            if(token.data?.code === 200){
                req.session.jwt = token.data.token;       
            } else { // 토큰 발급 실패
                return res.status(token.data?.code).json(token.data);
            }
        };

        const result = await axios.get(`${URL}/test`,{
            headers:{
                authorization : req.session.jwt
            }
        });

        return res.json(result.data);
    } catch (error) {
        // console.error(error);
        if(error.response?.status === 419){
            return res.json(error.response.data);   
        }

        return next(error);
    }

};