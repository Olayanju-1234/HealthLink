const { Router } = require('express');
const { auth, IsUserVerified } = require('../middlewares/authMiddleware');
const { getChats, getMyChats } = require('../controllers/chat');

const router = Router();

router.get('/', [auth, IsUserVerified], getMyChats);

router.get('/:userId', [auth, IsUserVerified], getChats);

const ChatRouter = router;
module.exports = { ChatRouter };

