const express = require('express');
const AuthController = require("../controllers/auth");
const { SignUpValidation } = require('../middlewares/authValidation');

const authController = new AuthController();

const router = express.Router();

router.post('/signup', SignUpValidation, authController.userSignup)
router.get('/activate/:token', authController.activate)
const AuthRouter = router;

module.exports = { AuthRouter };