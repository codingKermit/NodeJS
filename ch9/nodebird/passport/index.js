const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
    passport.serializeUser((user, done)=>{ // req.login 할 때 호출
        console.log('user : ',user);
        const id = user.user.id;
        const accessToken = user.accessToken;
        console.log('id',id);
        console.log('accessToken',accessToken);
        done(null,{id,accessToken});
    })

    passport.deserializeUser((user, done)=>{ // 로그인한 사용자의 모든 호출에서 사용
        const id = user.id;
        console.log('id :',id);
        User.findOne({
            where:{id},
            include:[
                {
                    model : User,
                    attribute:['id','nickname'],
                    as : 'Followers'
                },
                {
                    model : User,
                    attribute:['id','nickname'],
                    as : 'Followings'
                },
            ]
        })
        .then((user)=>{
            // console.log('user : ',user);
            // console.log('user.Followers : ',user.Followers);
            // console.log('user.Followers.length : ',user.Followers.length);
            // console.log('user.Followings : ',user.Followings);
            // console.log('user.Followings.length : ',user.Followings.length);
            done(null,user)
        })
        .catch((err)=>{
            done(err);
        })
    })

    local();

    kakao();
}