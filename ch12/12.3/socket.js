const SocketIO = require('socket.io');
const { removeRoom } = require('./services');
const Room = require('./schemas/room');
const Chat = require('./schemas/chat');

module.exports = (server, app, sessionMiddleware)=>{
    const io = SocketIO(server,{path: '/socket.io'});
    app.set('io',io);
    const room = io.of('/room');
    const chat = io.of('/chat');

    /**
     * 아래 구조의 코드를 한줄로 요약한 코드임
        const wrap = (middleware) => {
            return (socket, next) => {
                return middleware(socket.request, {}, next);
            };
        };
     */
    const wrap = middleware => (socket,next)=>middleware(socket.request,{},next);

    chat.use(wrap(sessionMiddleware));

    room.on('connection',async (socket)=>{
        console.log('room 네임스페이스 접속')
        const rooms = await Room.find({});
        socket.emit('roomList',rooms);
        socket.on('disconnect',()=>{
            console.log('room 네임스페이스 접속 해제');
        });
    });

    chat.on('connection', (socket)=>{
        console.log('chat 네임스페이스 접속')
        socket.on('disconnect',async ()=>{
            console.log('chat 네임스페이스 접속 해제');
            const { referer } = socket.request.headers;
            const roomId = new URL(referer).pathname.split('/').at(-1);
            const currentRoom = chat.adapter.rooms.get(roomId);
            const userCount = currentRoom?.size || 0;
            if(userCount === 0 ){
                await removeRoom(roomId);
                room.emit('removeRoom',roomId);
                console.log('방 제거 요청 성공');
            }else {
                const ids = Array.from(chat.sockets.values())
                  .map(item=>item.request.session.color);

                const msg = `${socket.request.session.color} 님이 나갔습니다.`;
                socket.to(roomId).emit('exit',{
                    user:'system',
                    chat:msg,
                    users:ids
                })

                await Chat.create({
                    room:roomId,
                    user:'system',
                    chat:msg
                })
            }
        });

        socket.on('join', async (data)=>{
            socket.join(data);

            const ids = Array.from(chat.sockets.values())
                .map(item=>item.request.session.color);
            
            const msg = `${socket.request.session.color} 님이 입장하셨습니다.`;
            // 본인이 입장했을 때 와 다른사람이 입장했을 때를 구분할 필요가 없으므로 아래와 같이 작성
            chat.to(data).emit('join',{
                user:'system',
                chat:msg,
                users : ids
            })

            await Chat.create({
                room:data,
                user:'system',
                chat:msg
            })


        })
    });
}