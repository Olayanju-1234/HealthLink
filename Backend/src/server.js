const { app } = require('./app');
const { launchDB } = require('./config/db');
const { createServer } = require('http');
const { initSockets } = require('./sockets/index');

const server = createServer(app);

initSockets(server);

// Connect to database
launchDB().then(() => {
    // Start server
    server.listen(process.env.PORT, () => {
        console.log(`Server started on port ${process.env.PORT}`);
    });
});
