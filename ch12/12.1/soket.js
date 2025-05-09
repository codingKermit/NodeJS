const WebSoket = require('ws');

module.exports = (server)=>{
    const was = new WebSoket.Server({server});

    was.on('connection',(ws,req)=>{
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress; // 클라이언트의 IP 주소를 가져옴
        console.log('새로운 클라이언트 접속',ip);
        ws.on('message',(message)=>{
            console.log(message.toString());
        })

        ws.on('error',console.error);

        ws.on('close',()=>{
            console.log('클라이언트 접속 해제',ip);
            clearInterval(ws.interval);
        });

        ws.interval = setInterval(()=>{
            if(ws.readyState === ws.OPEN){
                ws.send('서버에서 클라이언트로 메시지를 보냅니다.')
            }
        },3000)
    })
}