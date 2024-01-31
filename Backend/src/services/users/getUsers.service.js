const User = require('../../models/user.model');

class GetUsersService {
    async AllUsers() {
        const users = await User.find();
        return users;
    }

    async ById(id) {
        const user = await User.findById(id);
        return user;
    }

    async ByAccountType(accountType) {
        const users = await User.find({ accountType: accountType });
        return users;
    }
}

module.exports = GetUsersService;
