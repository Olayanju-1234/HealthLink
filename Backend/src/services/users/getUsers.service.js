const { UserModel } = require('../../models/userModel');

class GetUsersService {
    async AllUsers() {
        const users = await UserModel.findAll({
            raw: true,
        });

        return users;
    }

    async ById(id) {
        const user = await UserModel.findOne({
            where: {
                id: id,
            },
            raw: true,
        });

        return user;
    }

    async ByAccountType(accountType) {
        const user = await UserModel.findOne({
            where: {
                account_type: accountType,
            },
            raw: true,
        });

        return user;
    }
}

module.exports = GetUsersService;
