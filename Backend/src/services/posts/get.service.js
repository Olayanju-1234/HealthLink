const Post = require('../../models/post.model');

class GetPostsService {
    async AllPosts(
        limit,
        skip,
        sortBy = 'createdAt',
        orderBy = 'asc',
        filters = {}
    ) {
        const posts = await Post.find(filters)
            .limit(limit)
            .skip(skip)
            .sort({ [sortBy]: orderBy });
        return posts;
    }

    async ById(id) {
        const post = await Post.findById(id);
        return post;
    }

    async ByUserId(userId, limit, skip, sortBy = 'createdAt', orderBy = 'asc') {
        const posts = await Post.find({ user: userId })
            .limit(limit)
            .skip(skip)
            .sort({ [sortBy]: orderBy });
        return posts;
    }
}

module.exports = GetPostsService;

