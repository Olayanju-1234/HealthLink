const Chat = require('../../models/chat.model');

const CreateChat = async (chatData) => {
    if (!chatData.content || !chatData.sender || !chatData.receiver) {
        throw new Error('Please fill all necessary fields');
    }

    const newChat = await Chat.create(chatData);

    return newChat;
};

module.exports = CreateChat;
