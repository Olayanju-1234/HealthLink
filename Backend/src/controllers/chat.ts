const { GetChat, GetMyChats} = require('../services/chat/chat.service');
const { errorResponse, successResponse } = require('../utils/responseHandler');

// Get all chats
const getChats = async (req, res) => {
  try {
    const chats = await GetChat();
    return successResponse(res, chats);
  } catch (error) {
    return errorResponse(res, error);
  }
};

// Get my chats
const getMyChats = async (req, res) => {
  try {
    const chats = await GetMyChats(req.user.id);
    return successResponse(res, chats);
  } catch (error) {
    return errorResponse(res, error);
  }
};

module.exports = {
  getChats,
  getMyChats,
};
