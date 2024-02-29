const { whitelistOrigins } = require('../app'); // Import whitelist
const chatEvent = require('./chat');
const socketIO = require('socket.io');

let io;
const onlineUsers = new Map();

function handleChat(io) {
    console.log('Handling chat');
  io.on('connection', (socket) => {
    console.log(`A user ${socket.id} connected`);

    // Online users
    socket.on('online', ({ userId }) => {
      console.log(`User ${userId} is online`);

      onlineUsers.set(socket.id, userId);

      io.emit('online', Array.from(onlineUsers.values()));
    });

    socket.on('join_room', async (data) => {
      const { username, room } = data;

      if (!username || !room) {
        return;
      }

      socket.join(room);
      console.log(`User ${username} joined room ${room}`);

      socket.broadcast
        .to(room)
        .emit('chat_message', `Welcome to the chat, ${username}`);

      socket.emit('chat_message', `Welcome to the chat, ${username}`);
    });

    // Chat
    chatEvent(socket, io);

    socket.on('disconnect', () => {
      console.log('User disconnected');
      onlineUsers.delete(socket.id);
      io.emit('online', Array.from(onlineUsers.values()));
    });
  });
}

const initSockets = (server) => {
  io = socketIO(server, {
    cors: {
      origin: '*',
    },
  });
  
   handleChat(io);
};

const getSockets = () => io;

module.exports = {
  initSockets,
  getSockets,
  handleChat,
};
