const joi = require("joi");

const signupSchema = joi.object({
            password: joi.string().required(),
            email: joi.string().email().required(),
            phone_number: joi.string().regex(/^[0-9+]{3,16}$/),
            first_name: joi.string().required(),
            last_name: joi.string().required(),
            account_type: joi.string().valid('client','therapist'),
            country: joi.string().required(),
            activation_token: joi.string()
});

const SignUpValidation = async (req, res, next) => {
    const { error } = signupSchema.validate(req.body);
    if (error) {
        return res.status(406).json({
            message: error.message,
            success: false})
    }else {
        next();
    };
}

const loginSchema = joi.object({
    password: joi.string().required(),
    email: joi.string().email().required(),
});

const LoginValidation = async (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
        if (error) {
            return res.status(406).json({
             message: error.message,
            success: false})
        }else {
        next();
        };
}

// export const RefreshTokensValidationSchema = Joi.object().keys({
//   refreshToken: Joi.string().required(),
// });


module.exports = { SignUpValidation, LoginValidation }