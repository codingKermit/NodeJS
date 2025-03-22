const Domain = require('../models/domain');
const User = require('../models/user');

/**
 * uuid 라이브러리에서는 2025.03.02 기준 v1~v7 까지 구현되어 있음. 
 * 반드시 높은 버전이 하위 버전보다 좋은 것은 아니며,
 * 각각의 버전별로 특징이 있음
 * 예) v4는 완전한 난수라서 정렬 불가. v7는 타임스탬프가 있어서 정렬이 되지만 생성 시점 유출 가능
 */
const uuid = require('uuid');

exports.renderLogin = async (req,res,next)=>{
    try {
        // sequelize 의 where에는 undefined 가 들어가서는 안되기 때문에 null로 처리
        const id = req.user?.id || null;
        
        const user = await User.findOne({
            where:{id},
            include:{
                model:Domain
            }
        });
        res.render('login',{
            user,
            domains: user?.Domains
        })
    } catch (error) {
        console.error(error);
        next(error);
    }
}

exports.createDomain = async (req,res,next) =>{
    const id = req.user.id;

    const secretType = req.body['secret-type'];

    try {
        if(['client','server'].includes(secretType)){
            await Domain.create({
                UserId:id,
                host:req.body.host,
                type:req.body.type,
                [`${secretType}Secret`] : uuid.v7() // 강의에서는 v4를 사용하지만 인덱싱을 위해 v7을 사용
            })
            .then((result)=>{
                console.log('도메인 등록 결과 : ', result);
                res.redirect('/');
            })
            .catch((err)=>{
                console.error(err);
                next(err);
            })
        } else {
            throw new Error('정의 되지 않은 비밀키 타입');
        }    
    } catch (error) {
        console.error(error);
        next(error);
    }
}