const Chat = require('../../models/chat.model');

const CreateChat = async (chatData) => {
    if (!chatData) {
        throw new Error('Chat data is required');
    }

    const newChat = await Chat.create(chatData).populate({
        path: 'sender',
        select: 'first_name last_name email _id',
    });

    return newChat;
};

module.exports = CreateChat;
