const Sequelize = require('sequelize');

class Post extends Sequelize.Model {
    static initiate(sequelize){
        Post.init({
            content : {
                type:Sequelize.STRING(140),
                allowNull : false,

            },
            img : {
                type : Sequelize.STRING(200),
                allowNull : true,
            },
        },{
            sequelize,
            timestamps : true,
            underscored:false,
            paranoid:true,
            charset:'utf8mb4',
            collate:'utf8mb4_general_ci',
            tableName:'posts',
            modelName:'Post',
        })
    }

    static associate(db){
        db.Post.belongsTo(db.User);
        db.Post.belongsToMany(db.Hashtag,{
            through:'PostHashtag'
        })
        db.Post.belongsToMany(db.User,{
            through:'TwitLike',
            as : 'Twitter'
        })
    }
}

module.exports = Post;