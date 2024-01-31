const AuthService = require("../services/auth");
const { successResponse } = require("../utils/responseHandler");

const authService = new AuthService();

class AuthController {

async userSignup (req, res) {
    try{
    const user = await authService.register(req.body)
    return res.status(201).json({ message: 'User registered successfully. Please check your email for activation instructions.' })
    } catch (error){
        console.error(error);

        return res.status(500).json({ message: error.message || 'Internal Server Error' })
    }
}

async activate (req, res) {
    try{
        await authService.activate(req.params.token)
       return res.status(200).json({ message: 'Account activated successfully' });
    } catch (error){
        console.error(error);
        return res.status(500).json({ message: error.message || 'Internal Server Error' })
    }
}

};

module.exports = AuthController;



