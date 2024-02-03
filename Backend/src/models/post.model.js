const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        postedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;