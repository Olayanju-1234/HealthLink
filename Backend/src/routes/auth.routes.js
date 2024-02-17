const express = require('express');
const AuthController = require("../controllers/auth");
const { SignUpValidation, LoginValidation } = require('../middlewares/authValidation');

const authController = new AuthController();

const router = express.Router();

router.post('/signup', SignUpValidation, authController.userSignup)
router.get('/activate', authController.activate)
router.post('/login', LoginValidation, authController.userLogin)
router.post('/forgot-password', authController.forgotPassword)
router.post('/reset-password', authController.resetPassword)
const AuthRouter = router;

module.exports = { AuthRouter };