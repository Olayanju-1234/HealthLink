const CreateChat = require('../services/chat/create.service');

const chat = (socket, io) => {
    socket.on('chat', async (data) => {
        try {
            const newChat = await CreateChat(data);
            io.emit('chat', newChat);
        }  catch (error) {
            console.log(error);
        }
    });
}

module.exports = chat;
