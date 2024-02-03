const CreatePostService = require('../services/posts/create.service');
const GetPostsService = require('../services/posts/get.service');
const { successResponse, errorResponse } = require('../utils/responseHandler');
const { StatusCodes } = require('http-status-codes');

const createPostService = new CreatePostService();
const getPostsService = new GetPostsService();

class PostController {
    async allPosts(req, res) {
        try {
            let {
                limit = 10,
                skip = 0,
                sort = 'createdAt',
                order = 'asc',
                ...filters
            } = req.query;

            const posts = await getPostsService.AllPosts(
                limit,
                skip,
                sort,
                order,
                filters
            );

            return successResponse(
                res,
                StatusCodes.OK,
                'Posts retrieved successfully',
                posts
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

    async postById(req, res) {
        try {
            const post = await getPostsService.ById(req.params.id);

            return successResponse(
                res,
                StatusCodes.OK,
                'Post retrieved successfully',
                post
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

    async createPost(req, res) {
        try {
            const post = await createPostService.createPost(req.user._id, req.body);

            return successResponse(
                res,
                StatusCodes.CREATED,
                'Post created successfully',
                post
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

module.exports = PostController;