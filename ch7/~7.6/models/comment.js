const Sequelize = require('sequelize');

class Comment extends Sequelize.Model{
    static initicate(sequelize){
        Comment.init({
            comment:{
                type:Sequelize.TEXT,
                allowNull:false,
            },
            created_at:{
                type:Sequelize.DATE,
                allowNull:true,
                defaultValue:Sequelize.NOW
            },
        },{
            sequelize,
            timestamps:false,
            modelName:'Comment',
            tableName:'comments',
            paranoid:false,
            charset:'utf8mb4',
            collate:'utf8mb4_general_ci'
        })
    }

    static associate(db) {
        db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id', onDelete:'cascade',onUpdate:'cascade'});
    }
}

module.exports = Comment;