const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { AuthRouter } = require('./routes/auth.routes');
const { UserRouter } = require('./routes/user.routes');
const { PostRouter } = require('./routes/post.routes');
const { ChatRouter } = require('./routes/chat.routes');

const app = express();

// **Secure and Flexible CORS Configuration:**
const productionWhitelist = [
  // Replace with your actual production frontend URL(s)
  'https://your-production-frontend.com',
];

const developmentWhitelist = [
  'http://localhost:3000',
  'http://localhost:3001',
];

const whitelistOrigins = process.env.NODE_ENV === 'production'
  ? productionWhitelist
  : developmentWhitelist;

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelistOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies for authentication
};

console.log('CORS whitelist:', whitelistOrigins);
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

module.exports = { app, whitelistOrigins }; // Export whitelist
