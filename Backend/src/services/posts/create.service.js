const Post = require('../../models/post.model');

class CreatePostService {
    async createPost(userId, data) {
        const { content } = data;

        const post = await Post.create({
            user: userId,
            content,
        });

        return post;
    }
}

module.exports = CreatePostService;
