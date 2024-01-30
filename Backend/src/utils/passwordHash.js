const bcrypt = require('bcrypt');
const crypto = require('crypto');

const hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
};

const comparePassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
};

// generate 6 digit activation token using crypt
const generateActivationToken = (length) => {
    const token = crypto.randomBytes(length).toString('hex');
    return token;
};

module.exports = { hashPassword, comparePassword, generateActivationToken };
