const CreateChat = require('../services/chat/create.service');

const chatEvent = (socket, io) => {
    socket.on('chat_message', async (data) => {
        try {
            const newChat = await CreateChat(data);

            io.emit('chat_message', newChat);
        } catch (error) {
            console.log("Error sending chat message", error.message);
            io.emit('chat_message', error.message);
        }
    });
};

module.exports = chatEvent;
