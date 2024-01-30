const bcrypt = require('bcrypt');
const crypto = require('crypto');

const hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
};

const comparePassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
};

// generate 6 digit activation token using crypt
const generateActivationToken = () => {
    const token = Math.floor(100000 + Math.random() * 900000);
    return token;
};

module.exports = { hashPassword, comparePassword, generateActivationToken };
