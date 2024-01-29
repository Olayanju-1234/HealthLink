const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRE, GMAIL_USERNAME, GMAIL_PASSWORD, clientId, clientSecret, RefreshToken, AccessToken } = require("../config/index");
const { UserModel } = require("../models/userModel");
const nodemailer = require("nodemailer");
const { google } = require("googleapis")


class AuthService {
    async getSignedJwtToken  (user) {
    return jwt.sign( { id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRE,
    });
  }; 

  async register (data) {
    // validate user input
    if(
        !data.first_name ||
        !data.last_name ||
        !data.email ||
        !data.phone_number ||
        !data.password || 
        !data.account_type || 
        !data.country
    ){
        throw new Error('Please fill all necessary fields')
    }

    // check if user exist

    const checkUser = await UserModel.findOne({
        where: {
            [Op.or]: [{ email: data.email}, { phone_number: data.phone_number }]
        },
        raw: true,
    });

    if (checkUser) {
        if (checkUser.email == data.email) {
         throw new Error ('Email Already Exist')
        } else if (checkUser.phone_number == data.phone_number) {
         throw new Error ('Phone Number Already Exist')
        } 
      };

      // activation token
      const activation_token = bcrypt.hashSync(data.email, 10)
// hash password
const hashedPassword = bcrypt.hashSync(data.password, 10);

//  create user
 await UserModel.create({
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    phone_number: data.phone_number ,
    password: hashedPassword,
    account_type: data.account_type,  
    country: data.country,
    activation_token: activation_token
});

//  send activation email

const transporter = nodemailer.createTransport({
    service: "gmail",
  
    auth: {
      type: 'OAuth2',
      user: GMAIL_USERNAME,
      pass: GMAIL_PASSWORD,
      clientId: clientId,
      clientSecret: clientSecret,
      refreshToken: RefreshToken,
      // accessToken: accessToken
    }
  });

  const mailOptions = {
    from: GMAIL_USERNAME,
    to: data.email,
    subject: "Account Activation",
    text: `Click the following link to activate your account: http://localhost:3000/api/auth/activate/${activation_token}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      throw new Error ( 'Error sending activation email' );
    }
    console.log("Email sent: " + info.response);
    // console.log("Email sent successfully ");
  
  });
}; 

async activate (token) {

const user = await UserModel.findOne({ where: { activation_token: token } });

if (!user) {
  throw new Error('Invalid activation token');
}

user.is_verified = true;
user.activation_token = null;
await user.save();


};
    
  


};

module.exports = AuthService;