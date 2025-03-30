const User = require('../models/user');
const userCache = require('../passport/cache');

exports.follow = async (req,res,next) => {

    const id = req.user.id;
    const followId = req.params.id;

    console.log(`사용자 아아디 ${id} 가 ${followId} 를 팔로우 합니다.`);

    try {
        const user = await User.findOne({where:{id}});
        
        if(user){
            await user.addFollowing(parseInt(req.params.id,10));
            delete userCache[id];
            res.send('success');
        } else {
            res.status(404).send('no user');
        }
    } catch (error) {
        console.error(error);
        next(error);
    }

    // next();
}

exports.unfollow = async (req,res,next) => {
    try {
        const id = req.user.id;
        const unfollowId = req.params.id
        const user = await User.findOne({where:{id}})

        console.log(`${id} 사용자가 ${unfollowId} 를 언팔로우 합니다`);

        if(user){
            /**
             * // 방법1. 시퀄라이즈에서 생성해준 관계쿼리를 통해 제거.
             * 이 부분에서 다른 이들의 해결 방법을 찾아보니 removeFollower 를 사용하는 분들이 적지 않았다.
             * 하지만 언팔로우의 주체는 사용자니까 사용자 정보를 찾아 팔로우 정보를 제거하는 것이 코드의 직관성에 좋을 것이라 생각한다.
             */
            user.removeFollowings(unfollowId)
            .then((result)=>{
                console.log('result : ',result);
                delete userCache[id];
                res.send('success');
            })
            .catch((err)=>{
                console.error(err);
                next(err);
            })



            /*
            // 방법2. destroy 메서드 사용하기
            // sequelize 에서 생성해주는 중간 모델 Follow 를 찾아 destroy 하는 방법.
            // 하지만 코드 가독성과 직관성을 생각했을 때 첫번째 방법이 좋을 것 같다
            User.sequelize.models.Follow.destroy({
                where : {
                    followingId : unfollowId,
                    followerId : id
                }
            })
            .then((result)=>{
                console.log('result : ', result);
                res.send('success');
            })
            .catch((error)=>{
                console.error(error);
                next(error);
            })
            */

        } else {
            res.status(404).send('no user');
        }

    } catch (error) {
        console.error(error);
        next(error);
    }
}