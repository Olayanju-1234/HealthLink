const GetUsersService = require('../services/users/getUsers.service');
const { successResponse, errorResponse } = require('../utils/responseHandler');
const { StatusCodes } = require('http-status-codes');

const getUsersService = new GetUsersService();

class UserController {
    async allUsers(req, res) {
        try {
            const users = await getUsersService.AllUsers();

            return successResponse(
                res,
                StatusCodes.OK,
                'Users retrieved successfully',
                users
            );
        } catch (error) {
            console.error(error);

            return errorResponse(
                res,
                StatusCodes.INTERNAL_SERVER_ERROR,
                error.message || 'Internal Server Error'
            );
        }
    }

    async userById(req, res) {
        try {
            const user = await getUsersService.ById(req.params.id);

            return successResponse(
                res,
                StatusCodes.OK,
                'Users retrieved successfully',
                user
            );
        } catch (error) {
            console.error(error);

            return errorResponse(
                res,
                StatusCodes.INTERNAL_SERVER_ERROR,
                error.message || 'Internal Server Error'
            );
        }
    }

    async userByAccountType(req, res) {
        try {
            const user = await getUsersService.ByAccountType(
                req.params.account_type
            );

            return successResponse(
                res,
                StatusCodes.OK,
                'Users retrieved successfully',
                user
            );
        } catch (error) {
            console.error(error);

            return errorResponse(
                res,
                StatusCodes.INTERNAL_SERVER_ERROR,
                error.message || 'Internal Server Error'
            );
        }
    }
}

module.exports = UserController;
