const Room = require('../schemas/room');
const Chat = require('../schemas/chat');
const { removeRoom:removeRoomService } = require('../services');

exports.renderMain = async (req,res,next)=>{
    try {
        const rooms = await Room.find({});
        res.render('main',{rooms,title:'GIF 채팅방'});
    } catch (error) {
        console.error(error);
        next(error);
    }
}
exports.renderRoom = (req,res,next)=>{
    res.render('room',{title:'GIF 채팅방 생성'});
}
exports.createRoom =  async (req,res,next)=>{
    try {
        const newRoom = await Room.create({
            title:req.body.title,
            max:req.body.max,
            owner:req.session.color,
            max:req.body.max,
            password:req.body.password
        });
        const io = req.app.get('io');
        io.of('/room').emit('newRoom',newRoom);
        if(req.body.password){
            res.redirect(`/room/${newRoom._id}?password=${req.body.password}`);
        } else {
            res.redirect(`/room/${newRoom._id}`);
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
}
exports.enterRoom = async (req,res,next)=>{
    try {
        const room = await Room.findOne({_id:req.params.id});
        if(!room){
            return res.redirect('/error=존재하지 않는 방입니다.');
        };

        if(room.password && room.password !== req.query?.password){
            return res.redirect('/error=비밀번호가 틀렸습니다');
        };
        const io = req.app.get('io');
        const {rooms} = io.of('/chat').adapter;

        if(room.max <= rooms.get(req.params.id)?.size){
            return res.redirect('/?error=허용 인원을 초과했습니다.');
        };
        const chats = await Chat.find({room:room._id}).sort('createdAt');
        res.render('chat',{title:'GIF 채팅방 입장',room,chats,user:req.session.color});
    } catch (error) {
        console.error(error);
        next(error);
    }
}
exports.removeRoom = async (req,res,next)=>{
    try {
        await removeRoomService(req.params.id);
        res.send('ok');
    } catch (error) {
        console.error(error);
        next(error);
    }
}

exports.sendChat = async (req,res,next)=>{
    try {
        const chat = await Chat.create({
            room:req.params.id,
            user:req.session.color,
            chat:req.body.chat
        });
        req.app.get('io').of('/chat').to(req.params.id).emit('chat',chat);
        res.send('ok');
    } catch (error) {
        console.error(error);
        next(error);
    }
}

exports.sendGif = async (req,res,next) =>{
    try {
        console.log('file : ',req.file);
        const chat = await Chat.create({
            room:req.params.id,
            user:req.session.color,
            gif:req.file.filename
        })
        req.app.get('io').of('/chat').to(req.params.id).emit('chat',chat);
        res.send('ok');
    } catch (error) {
        console.error(error);
        next(error);
    }
}