const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRE } = require('../config/index');
const User = require('../models/user.model');
const { sendRegistrationMail } = require('./email');
const {
    generateActivationToken,
    hashPassword,
    comparePassword,
} = require('../utils/passwordHash');

class AuthService {
    async getSignedJwtToken(user) {
        return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
            expiresIn: JWT_EXPIRE,
        });
    }

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
        })

        if (checkUser) {
            if (checkUser.email == data.email) {
                throw new Error('Email Already Exists');
            }
        }


        // generate activation token
        const activationToken = generateActivationToken();

        // hash password
        const hashedPassword = hashPassword(data.password);

        // create user
        await User.create({
            email: data.email,
            password: hashedPassword,
            account_type: data.account_type,
            country: data.country,
            activationToken: activationToken,
        });

        // send activation email
        await sendRegistrationMail(data.email, activationToken);
    }

    async activate(token) {
        const user = await User.findOneAndUpdate(
            { activationToken: token },
            { $set: { isVerified: true, activationToken: null } }
        );

        if (!user) {
            throw new Error('Invalid activation token');
        }
    }

  async login(data) {
    // validate user input
    if (!data.email && !data.password){
      throw new Error('Please enter the necessary fields')

    }

    // check if user exists
    const user = await UserModel.findOne({
       email: data.email
    });
    if (!user) {
      throw new Error("User does not exist")
    }

    // compare user password against hashed password
    const userPassword = await (data.password, user.password);
    if (user && userPassword){
      // generate token
      const token = this.getSignedJwtToken(user);
       return { user, token}
    }
  }
}

module.exports = AuthService;