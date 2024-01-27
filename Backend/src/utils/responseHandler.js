const { StatusCodes } = require('http-status-codes');

const successResponse = (
    res,
    statusCode = StatusCodes.OK,
    message,
    data
) => {
    const response = {
        status: 'success',
        message,
        data,
    };

    return res.status(statusCode).json(response);
}

const errorResponse = (
    res,
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
    message,
    error
) => {
    const response = {
        status: 'error',
        message,
        error,
    };

    return res.status(statusCode).json(response);
}

module.exports = {
    successResponse,
    errorResponse,
};
