const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRE } = require('../config/index');
const { UserModel } = require('../models/userModel');
const { sendRegistrationMail } = require('./email');
const {
    generateActivationToken,
    hashPassword,
    comparePassword,
} = require('../utils/passwordHash');

class AuthService {
    async getSignedJwtToken(user) {
        return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: JWT_EXPIRE,
        });
    }

    async register(data) {
        // validate user input
        if (
            !data.first_name ||
            !data.last_name ||
            !data.email ||
            !data.phone_number ||
            !data.password ||
            !data.account_type ||
            !data.country
        ) {
            throw new Error('Please fill all necessary fields');
        }

        // check if user exist

        const checkUser = await UserModel.findOne({
            where: {
                [Op.or]: [
                    { email: data.email },
                    { phone_number: data.phone_number },
                ],
            },
            raw: true,
        });

        if (checkUser) {
            if (checkUser.email == data.email) {
                throw new Error('Email Already Exist');
            } else if (checkUser.phone_number == data.phone_number) {
                throw new Error('Phone Number Already Exist');
            }
        }

        // generate activation token 6 digit using bcrypt
        const activation_token = generateActivationToken(6);

        // hash password
        const hashedPassword = hashPassword(data.password);

        //  create user
        await UserModel.create({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone_number: data.phone_number,
            password: hashedPassword,
            account_type: data.account_type,
            country: data.country,
            activation_token,
        });

        //  send activation email
        await sendRegistrationMail(data.email, activation_token);
    }

    async activate(token) {
        const user = await UserModel.findOne({
            where: { activation_token: token },
        });

        if (!user) {
            throw new Error('Invalid activation token');
        }

        user.is_verified = true;
        user.activation_token = null;
        await user.save();
    }
}

module.exports = AuthService;
