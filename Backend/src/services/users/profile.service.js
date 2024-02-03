const User = require('../../models/user.model');

class ProfileService {
    async SetTherapistProfile(id, data) {
        const { first_name, last_name, phone_number, specialty } = data;

        const therapist = await User.findByIdAndUpdate(
            id,
            {
                first_name,
                last_name,
                phone_number,
                specialty,
            },
            { new: true }
        );

        return therapist;
    }

    async SetClientProfile(id, data) {
        const { first_name, last_name, phone_number } = data;

        const client = await User.findByIdAndUpdate(
            id,
            {
                first_name,
                last_name,
                phone_number,
            },
            { new: true }
        );

        return client;
    }

    async GetProfile(id) {
        const profile = await User.findById(id);

        return profile;
    }
}

module.exports = ProfileService;

