const { GetChat, GetMyChats } = require('../services/chat/chat.service');
const { errorResponse, successResponse } = require('../utils/responseHandler');

// Get my chats
const getMyChats = async (req, res) => {
    const user = req.user;
    try {
        const chats = await GetMyChats(user.id);
        return successResponse(res, 200, 'Chats fetched successfully', chats);
    } catch (error) {
        return errorResponse(
            res,
            500,
            error.message || 'Internal Server Error'
        );
    }
};

// Get all chats
const getChats = async (req, res) => {
    const user = req.user;
    const { userId } = req.params;
    let { limit = 10, page = 1 } = req.query;
    try {
        const chats = await GetChat(user.id, userId, {
            limit: parseInt(limit),
            page: parseInt(page),
        });

        return successResponse(res, 200, 'Chats returned successfully', chats);
    } catch (error) {
        return errorResponse(
            res,
            500,
            error.message || 'Internal Server Error'
        );
    }
};

module.exports = {
    getChats,
    getMyChats,
};
