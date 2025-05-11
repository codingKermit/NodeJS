const {app, sessionMiddleware} = require('./app');
const webSoket = require('./socket');

const server = app.listen(app.get('port'),()=>{
    console.log(app.get('port'),'번 포트에서 대기 중');
});


webSoket(server,app, sessionMiddleware);