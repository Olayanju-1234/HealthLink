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
// const productionWhitelist = ['*', 'you']; // Replace with your domain

// const developmentWhitelist = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003'];

// const whitelistOrigins = process.env.NODE_ENV === 'production'
//   ? productionWhitelist
//   : developmentWhitelist;

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelistOrigins.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//       console.log(whitelistOrigins.indexOf(origin) !== -1 ? 'Whitelist origin' : 'No origin');
//       console.log('CORS allowed:', origin);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//       console.log('CORS error:', origin);
//     }
//   },
//   credentials: true, // Allow cookies for authentication
// };

app.use(cors());

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

module.exports = app; // Export whitelist
