const Chat = require('../../models/chat.model');

const CreateChat = async (chatData) => {
    if (!chatData) {
        throw new Error('Chat data is required');
    }

    const newChat = await Chat.create(chatData);

    return newChat;
};

module.exports = CreateChat;
