const SocketIO = require('socket.io');

module.exports=(server,app)=>{
    const io = SocketIO(server,{
        path:'/socket.io'
    });
    app.set('io',io);

    io.on('connection',(socket)=>{
        const req = socket.request;
        const {headers:{referer}} = req;
        const roomId = new URL(referer).pathname.split('/').at(-1);
        socket.join(roomId);
        socket.on('disconnect',()=>{
            socket.leave(roomId);
        })
    })
}