const GetUsersService = require('../services/users/getUsers.service');
const ProfileService = require('../services/users/profile.service');
const { successResponse, errorResponse } = require('../utils/responseHandler');
const { StatusCodes } = require('http-status-codes');

const getUsersService = new GetUsersService();

class UserController {
    async allUsers(req, res) {
        try {
            let {
                limit = 10,
                skip = 0,
                sort = 'createdBy',
                order = 'asc',
                ...filters
            } = req.query;

            // Convert all filter values to lowercase
            filters = Object.fromEntries(
                Object.entries(filters).map(([key, value]) => [
                    key,
                    value.toLowerCase(),
                ])
            );

            const users = await getUsersService.AllUsers(
                limit,
                skip,
                sort,
                order,
                filters
            );

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
                'User retrieved successfully',
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

    async getAllClients(req, res) {
        try {
            const {
                limit = 10,
                skip = 0,
                sort = 'createdBy',
                order = 'asc',
            } = req.query;

            const clients = await getUsersService.AllClients(
                limit,
                skip,
                sort,
                order
            );

            return successResponse(
                res,
                StatusCodes.OK,
                'Clients retrieved successfully',
                clients
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

    async getAllTherapists(req, res) {
        try {
            const {
                limit = 10,
                skip = 0,
                sort = 'createdBy',
                order = 'asc',
            } = req.query;

            const therapists = await getUsersService.AllTherapists(
                limit,
                skip,
                sort,
                order
            );

            return successResponse(
                res,
                StatusCodes.OK,
                'Therapists retrieved successfully',
                therapists
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

    async setTherapistProfile(req, res) {
        const userId = req.user._id || req.params.id;
        try {
            const profileService = new ProfileService();
            const therapist = await profileService.SetTherapistProfile(
                userId,
                req.body
            );

            return successResponse(
                res,
                StatusCodes.OK,
                'Profile updated successfully',
                therapist
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

    async setClientProfile(req, res) {
        const userId = req.user._id || req.params.id;
        try {
            const profileService = new ProfileService();
            const client = await profileService.SetClientProfile(
                userId,
                req.body
            );

            return successResponse(
                res,
                StatusCodes.OK,
                'Profile updated successfully',
                client
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

    async getProfile(req, res) {
        try {
            const profileService = new ProfileService();
            const profile = await profileService.GetProfile(req.params.id);

            return successResponse(
                res,
                StatusCodes.OK,
                'Profile retrieved successfully',
                profile
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
