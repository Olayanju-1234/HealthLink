const chatModel = require('../../models/chat.model');
const mongoose = require('mongoose');

async function Paginate(model, aggregate, page, limit) {
    const pipeline = [
        {
            $facet: {
                totalData: [...aggregate, { $skip: page * limit }],
                totalCount: [...aggregate, { $count: 'count' }],
            },
        },
    ];

    if (limit > 0) {
        pipeline[0].$facet.totalData.push({ $limit: limit });
    }

    const data = await model.aggregate(pipeline);

    let { totalCount, totalData } = data[0];

    return {
        results: totalData,
        currentPage: page + 1,
        totalPages: Math.ceil(
            totalCount.length ? totalCount[0].count / limit : 0
        ),
        totalResults: totalCount.length ? totalCount[0].count : 0,
    };
}

const GetChat = async (userId, receiverId, options) => {
    userId = new mongoose.Types.ObjectId(userId);
    receiverId = new mongoose.Types.ObjectId(receiverId);

    const { limit, page } = options;
    let aggregate = [];
    let match = {};

    match = {
        $or: [
            { sender: userId, receiver: receiverId },
            { sender: receiverId, receiver: userId },
        ],
    };

    aggregate.push({
        $match: match,
    });

    aggregate.push({
        $sort: {
            createdAt: 1,
        },
    });
    const chat = await Paginate(chatModel, aggregate, page - 1, limit);

    return chat;
};

const GetMyChats = async (userId) => {
    userId = new mongoose.Types.ObjectId(userId);
    const aggregate = [
        {
            $match: {
                $or: [{ sender: userId }, { receiver: userId }],
            },
        },
        {
            $sort: {
                createdAt: -1,
            },
        },
        // {
        //     $group: {
        //         _id: {
        //             $cond: {
        //                 if: { $eq: ['$sender', userId] },
        //                 then: '$receiver',
        //                 else: '$sender',
        //             },
        //         },
        //         lastMessage: { $first: '$$ROOT' },
        //     },
        // },
        // {
        //     $replaceRoot: {
        //         newRoot: '$lastMessage',
        //     },
        // },
        {
            $lookup: {
                from: 'users',
                localField: 'sender',
                foreignField: '_id',
                as: 'sender',
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'receiver',
                foreignField: '_id',
                as: 'receiver',
            },
        },
        {
            $unwind: '$sender',
        },
        {
            $unwind: '$receiver',
        },
        {
            $project: {
                content: 1,
                sender: {
                    firstName: 1,
                    lastName: 1,
                    username: 1,
                },
                receiver: {
                    firstName: 1,
                    lastName: 1,
                    username: 1,
                },
                seen: 1,
                createdAt: 1,
            },
        },
    ];
    const chats = await chatModel.aggregate(aggregate);
    return chats;
};

module.exports = { GetChat, GetMyChats };
