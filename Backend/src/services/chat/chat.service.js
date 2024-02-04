const Chat = require('../../models/chat.model');
const mongoose = require('mongoose');

const GetChat = async (
    userId,
    receiverId,
    options = { page: 1, limit: 10 }
) => {
    const { page, limit } = options;
    const query = {
        $or: [
            {
                sender: mongoose.Types.ObjectId(userId),
                receiver: mongoose.Types.ObjectId(receiverId),
            },
            {
                sender: mongoose.Types.ObjectId(receiverId),
                receiver: mongoose.Types.ObjectId(userId),
            },
        ],
    };
    const chat = await Chat.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('sender', 'first_name last_name email')
        .populate('receiver', 'first_name last_name email');
    return chat;
};

const GetMyChats = async (userId, options = { page: 1, limit: 10 }) => {
    const { page, limit } = options;
    const query = {
        $or: [
            { sender: mongoose.Types.ObjectId(userId) },
            { receiver: mongoose.Types.ObjectId(userId) },
        ],
    };
    const chat = await Chat.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('sender', 'first_name last_name email')
        .populate('receiver', 'first_name last_name email');
    return chat;
};

module.exports = { GetChat, GetMyChats };
