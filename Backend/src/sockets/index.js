const { whitelistUrls } = require('../app');
const chat = require('./chat');

let io;
const onlineUsers = new Map();

function handleChat(io) {
    io.on("connection", (socket) => {
        console.log(`A user ${socket.id} connected`);
        socket.on('online', ({ userId }) => {
            console.log('User joined', userId);
            
            onlineUsers.set(socket.id, userId);

            io.emit('online', Array.from(onlineUsers.keys()));
        });

        socket.on('join',async (data) => {
            const { username, room } = data;
            
            socket.join(room);

            socket.broadcast.to(room).emit('message', { username, room });

            socket.emit('message', { username, room });
        }
        );

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

