const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        minlength: 2,
    },
    last_name: {
        type: String,
        minlength: 2,
    },
    username: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: function (value) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
            },
            message: 'Please enter a valid email address',
        },
    },
    phone_number: {
        type: String,
        message: 'Please confirm phone number contains valid characters',
        validate: {
            validator: function (value) {
                return /^[0-9]+$/.test(value);
            },
            message: 'Please enter a valid phone number',
        },
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    country: {
        type: String,
        required: true,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    postal_code: {
        type: String,
    },
    account_type: {
        type: String,
        enum: ['client', 'therapist'],
        default: 'client',
        required: true,
    },
    activationToken: {
        type: String,
        select: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    specialty: {
        type: String,
    },
    passwordResetToken: String,
    passwordResetTokenExpiration: Date,
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
