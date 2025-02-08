const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
    passport.serializeUser((user, done)=>{ // req.login 할 때 호출
        // console.log('user : ',user);
        done(null,user);
    })

    passport.deserializeUser((user, done)=>{ // 로그인한 사용자의 모든 호출에서 사용
        // console.log('id :',user.user.id);
        User.findOne({where:{id:user.user.id}})
        .then((user)=>{
            done(null,user)
        })
        .catch((err)=>{
            done(err);
        })
    })

    local();

    kakao();
}