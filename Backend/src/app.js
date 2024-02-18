const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { AuthRouter } = require('./routes/auth.routes');
const { UserRouter } = require('./routes/user.routes');
const { PostRouter } = require('./routes/post.routes');
const { ChatRouter } = require('./routes/chat.routes');

const app = express();

// ** CORS **
let whitelist = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://healthlink-gxhn.onrender.com'
];

const whitelistUrls = whitelist;

const corsOptions = {
    origin: '*',
};

app.use(cors(corsOptions));

// morgan
app.use(morgan('dev'));

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    return res.status(200).send({
        message: 'Welcome to the API',
    });
});

app.use('/api/auth', AuthRouter);
app.use('/api/user', UserRouter);
app.use('/api/post', PostRouter);
app.use('/api/chat', ChatRouter);

// Unknown routes
app.use((req, res) => {
    return res.status(404).send({
        message: 'Route' + req.url + ' Not found.',
    });
});

module.exports = { app, whitelistUrls};
