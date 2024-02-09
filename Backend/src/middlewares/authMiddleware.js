const { errorResponse } = require('../utils/responseHandler');
const { verify } = require('jsonwebtoken');

const IsUserVerified = async (req, res, next) => {
    const user = req.user;

    if (!user.isVerified) {
        return errorResponse(res, 401, 'User not verified');
    }

    return next();
};

const IsUserTherapist = async (req, res, next) => {
    const user = req.user;

    if (user.accountType !== 'therapist') {
        return errorResponse(res, 401, 'User not a therapist');
    }

    return next();
};

const IsUserClient = async (req, res, next) => {
    const user = req.user;

    if (user.accountType !== 'client') {
        return errorResponse(res, 401, 'User not a client');
    }

    return next();
};

const extractToken = (req) => {
    const token = req.headers.authorization;

    if (token && token.startsWith('Bearer ')) {
        return token.split(' ')[1];
    }

    return null;
};

const auth = async (req, res, next) => {
    const token = extractToken(req);

    if (!token) {
        return errorResponse(res, 401, 'Unauthorized');
    }

    verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return errorResponse(res, 401, 'Token expired');
            }

            if (err.name === 'JsonWebTokenError') {
                return errorResponse(res, 401, 'Invalid token');
            }

            return errorResponse(res, 401, 'Unauthorized');
        }

        req.user = user;
        return next();
    });
};

module.exports = {
    auth,
    IsUserVerified,
    IsUserTherapist,
    IsUserClient,
};
