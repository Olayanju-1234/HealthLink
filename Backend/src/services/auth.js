const { JWT_SECRET, JWT_EXPIRE } = require('../config/index');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { sendRegistrationMail } = require('./email');
const {
    generateActivationToken,
    hashPassword,
    comparePassword,
} = require('../utils/passwordHash');

class AuthService {
    async register(data) {
        // validate user input
        if (
            !data.email ||
            !data.password ||
            !data.account_type ||
            !data.country
        ) {
            throw new Error('Please fill all necessary fields');
        }

        // check if user exists
        const checkUser = await User.findOne({
            email: data.email,
        });

        if (checkUser) {
            throw new Error('User already exists');
        }

        // generate activation token
        const activationToken = generateActivationToken();
        data.activationToken = activationToken;

        // hash password
        data.password = hashPassword(data.password);

        // create user
        const newUser = await User.create(data);

        // send activation email
        await sendRegistrationMail(data.email, activationToken);

        const { password, ...user } = newUser.toJSON();

        return user;
    }

    async login(data) {
        const user = await User.findOne({ email: data.email }).select(
            '+password'
        );

        if (!user || !comparePassword(data.password, user.password)) {
            throw new Error('Invalid email or password');
        }

        if (!user.isVerified) {
            throw new Error('User not verified');
        }

        const token = await this.getSignedJwtToken({
            id: user._id,
            isVerified: user.isVerified,
            accountType: user.account_type,
        });

        const { password, ...userData } = user.toJSON();

        return { ...userData, ...token, expiresIn: JWT_EXPIRE };
    }

    async getSignedJwtToken(payload) {
        const accessToken = jwt.sign(payload, JWT_SECRET, {
            expiresIn: JWT_EXPIRE,
        });

        const refreshToken = jwt.sign(payload, JWT_SECRET, {
            expiresIn: '7d',
        });

        return { accessToken, refreshToken };
    }

    async activate(token) {
        const user = await User.findOne({ activationToken: token });

        if (!user) {
            throw new Error('Invalid token');
        }

        user.isVerified = true;
        user.activationToken = null;

        await user.save();

        const Token = await this.getSignedJwtToken({
            id: user._id,
            isVerified: user.isVerified,
            accountType: user.account_type,
        });

        return {
            ...user.toJSON(),
            ...Token,
            expiresIn: JWT_EXPIRE,
        };
    }
}

module.exports = AuthService;
