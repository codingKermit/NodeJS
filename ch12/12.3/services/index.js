const Room = require('../schemas/room');
const Chat = require('../schemas/chat');

exports.removeRoom = async (roomId) => {
    try {
        await Room.deleteOne({_id:roomId});
        await Chat.deleteMany({_id:roomId});
    } catch (error) {
        throw error;
    }
}