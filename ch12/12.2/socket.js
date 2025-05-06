const SocketIO = require('socket.io');

module.exports = (server)=>{
    const io = SocketIO(server,{path: '/socket.io'});

    io.on('connection',(socket)=>{
        const req = socket.request;
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress; // 클라이언트의 IP 주소를 가져옴
        console.log('새로운 클라이언트 접속',ip, socket.id);

        socket.on('reply',(data)=>{
            console.log(data);
        })

        socket.on('error',console.error);

        // ws의 close 이벤트에 대응
        socket.on('disconnect',()=>{
            console.log('클라이언트 접속 해제',ip, socket.id); 
            clearInterval(socket.interval);
        });

        socket.interval = setInterval(()=>{
            // socket-io 에서는 연결상태를 확인 후 보내기 때문에 개발자가 직접 확인할 필요가 없다
            socket.emit('news','Hello Socket.IO')
        },3000)
    })
}