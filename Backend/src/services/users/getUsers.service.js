const User = require('../../models/user.model');

class GetUsersService {
    async AllUsers(
        limit,
        skip,
        sortBy = 'createdAt',
        orderBy = 'asc',
        filters = {}
    ) {
        const users = await User.find(filters)
            .limit(limit)
            .skip(skip)
            .sort({ [sortBy]: orderBy });
        return users;
    }

    async ById(id) {
        const user = await User.findById(id);
        return user;
    }

    async AllClients(limit, skip, sortBy = 'createdAt', orderBy = 'asc') {
        const clients = await User.find({ account_type: 'client' })
            .limit(limit)
            .skip(skip)
            .sort({ [sortBy]: orderBy });
        return clients;
    }

    async AllTherapists(limit, skip, sortBy = 'createdAt', orderBy = 'asc') {
        const therapists = await User.find({ account_type: 'therapist' })
            .limit(limit)
            .skip(skip)
            .sort({ [sortBy]: orderBy });
        return therapists;
    }
}

module.exports = GetUsersService;
