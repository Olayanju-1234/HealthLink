const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('./routes');

const app = express();

// cors
let corsOptions = {
    origin: 'http://localhost:3000',
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

// router(app);

// Unknown routes
app.use((req, res) => {
    return res.status(404).send({
        message: 'Route' + req.url + ' Not found.',
    });
});

module.exports = app;
