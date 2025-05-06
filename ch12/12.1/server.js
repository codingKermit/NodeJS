const app = require('./app');
const webSoket = require('./soket');

const server = app.listen(app.get('port'),()=>{
    console.log(app.get('port'),'번 포트에서 대기 중');
});

webSoket(server);