const { whitelistUrls } = require('../app');
const chat = require('./chat');
const CreateChat = require('../services/chat/create.service');

function handleChat(io) {
    io.on('connection', (socket) => {
        console.log('User connected');
        socket.on('join', (user) => {
            console.log('User joined', user);
            onlineUsers.set(user._id, socket.id);
        });

        chat(socket, io);
    });

    io.on('disconnect', () => {
        console.log('User disconnected');
    });
}

const initSockets = (server) => {
    io = require('socket.io')(server, {
        cors: {
            origin: whitelistUrls,
        },
    });

    handleChat(io);
}

const getSockets = () => {
    return io;
}

module.exports = {
    initSockets,
    getSockets,
    handleChat,
};

