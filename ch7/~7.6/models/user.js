const Sequelize = require('sequelize');

class User extends Sequelize.Model{

    static initicate(sequelize){
        User.init({
            name : {
                type : Sequelize.STRING(20),
                allowNull : false,
                unique:true
            },
            age : {
                type:Sequelize.TINYINT.UNSIGNED, // 양수만을 사용할 것임을 명시. 원래의 TINYINT는 -128~127지만 UNSIGNED를 명시함으로써 0~255 범위를 가지도록함
                allowNull:false
            },
            married : {
                type : Sequelize.BOOLEAN,
                allowNull:false
            },
            comment:{
                type: Sequelize.TEXT,
                allowNull:true
            },
            created_at : {
                type: Sequelize.DATE,
                allowNull:false,
                defaultValue:Sequelize.NOW
            }
        },{
            sequelize,
            timestamps:false, // createdAt, updatedAt 컬럼 자동 생성
            paranoid:false, // deletedAt 컬럼 자동 생성 (soft delete 방식)
            underscored:false, // 자동 생성되는 컬럼의 언더스코어 사용 여부
            modelName:'User',
            tableName:'users',
            charset:'utf8mb4',
            collate:'utf8mb4_general_ci'
        })
    }

    static associate(db) {
        db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id'});
    }
}

module.exports = User;