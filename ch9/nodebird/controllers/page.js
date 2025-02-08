exports.renderMain = (req,res,next) => {
    // console.log('session : ',req.session);
    res.render('main',
        {
            title:'NodeBird',
            twits:[]
        }
    )
};

exports.renderJoin = (req,res,next) => {
    res.render('join',{title:'회원 가입 - NodeBird'});
};

exports.renderProfile = (req,res,next) => {
    res.render('profile',{title:'내 정보 - NodeBird'});
};