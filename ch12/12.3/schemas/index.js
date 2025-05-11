const mongoose = require('mongoose');

const connect = ()=>{
    if(process.env.NODE_ENV !== 'production'){
        mongoose.set('debug',true);
    };

    mongoose.connect(`mongodb://${process.env.MONGO_ID}:${process.env.MONGO_PASSWORD}@localhost:27017/admin`,{
        dbName:'gifchat',
    }).then(()=>{
        console.log('몽고 DB 연결 성공');
    })
    .catch((error)=>{
        console.error('몽고 DB 연결 에러',error)
    })
};

mongoose.connection.on('error',(error)=>{
    console.error('몽고 DB 연결 에러',error);
});

mongoose.connection.on('disconnected',()=>{
    console.error('몽고 DB 연결이 끊어졌습니다. 연결을 재시도합니다.');
    connect();
});

module.exports = connect;