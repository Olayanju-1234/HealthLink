const AuthService = require('../services/auth');
const { successResponse, errorResponse } = require('../utils/responseHandler');

const authService = new AuthService();

class AuthController {
    async userSignup(req, res) {
        const body = req.body;

        try {
            const user = await authService.register(body);
            return successResponse(
                res,
                201,
                'User registered successfully',
                user
            );
        } catch (error) {
            console.error(error);
            return errorResponse(
                res,
                500,
                error.message || 'Internal Server Error'
            );
        }
    }

    async activate(req, res) {
        const { token } = req.query;

        if (!token) {
            return errorResponse(res, 400, 'Invalid token');
        }

        try {
            const user = await authService.activate(token);
            return successResponse(
                res,
                200,
                'User activated successfully',
                user
            );
        } catch (error) {
            console.error(error);
            return errorResponse(
                res,
                500,
                error.message || 'Internal Server Error'
            );
        }
    }

    async userLogin(req, res) {
        const { email, password } = req.body;

        try {
            const user = await authService.login({ email, password });

            return successResponse(
                res,
                200,
                'User logged in successfully',
                user
            );
        } catch (error) {
            console.error(error);
            return errorResponse(
                res,
                500,
                error.message || 'Internal Server Error'
            );
        }
    }

    async forgotPassword(req, res) {
        const { email } = req.body;

        try {
            await authService.ForgotPassword(email);
            return successResponse(
                res,
                200,
                'Password reset link sent to your email'
            );
        } catch (error) {
            console.error(error);
            return errorResponse(
                res,
                500,
                error.message || 'Internal Server Error'
            );
        }
    }

    async resetPassword(req, res) {
        const { token, password } = req.body;

        try {
            await authService.resetPassword(token, password);
            return successResponse(res, 200, 'Password reset successfully');
        } catch (error) {
            console.error(error);
            return errorResponse(
                res,
                500,
                error.message || 'Internal Server Error'
            );
        }
    }


}

module.exports = AuthController;
