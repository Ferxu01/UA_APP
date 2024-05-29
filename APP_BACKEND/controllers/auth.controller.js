const { authService, userService } = require('../services');
const { userSchema } = require('../schemas');
const { generaToken } = require('../helpers/token.helper');
const { encriptaPassword, comparaPassword } = require('../helpers/pass.helper');
const responseError = require('../utils/messages/responseError');
const responseAuth = require('../utils/messages/responseAuth');
const catchedAsync = require('../utils/catchedAsync');

const i18n = require('../config/i18n');

const signUp = async (req, res, next) => {
    const validatedResult = await userSchema.validateRegister(req.body);

    if (validatedResult.error)
        return responseError(res, 400, JSON.parse(validatedResult.error.message));

    const { email, password } = validatedResult.data;
    const user = await userService.getUserByEmail(email);

    if (user)
        return responseError(res, 400, i18n.__('register.emailExists'));
    else {
        const encryptedPass = await encriptaPassword(password);

        const usuario = {
            ...validatedResult.data,
            password: encryptedPass,
        };
        delete usuario.password2;

        const response = await authService.postRegister(usuario);
        usuario.id = response.insertId;

        const token = generaToken(); // Generar UUID con libreria crypto
        return responseAuth(res, 200, token, usuario);
    }
};

const signIn = async (req, res, next) => {
    const validatedResult = await userSchema.validateLogin(req.body);
    
    if (validatedResult.error)
        return responseError(res, 400, JSON.parse(validatedResult.error.message));
    
    const user = await authService.postLogin(validatedResult.data);

    if (!user) {
        return responseError(res, 400, i18n.__('login.userNotFound'));
    } else {
        const { password } = validatedResult.data;
        const equalPass = await comparaPassword(password, user.pwd);
        delete user.pwd;
        user.email = user.correo;
        delete user.correo;

        if (equalPass) {
            const token = generaToken(); // Generar UUID con libreria crypto
            return responseAuth(res, 200, token, user);
        } else {
            return responseError(res, 401, i18n.__('login.wrongPassword'));
        }
    }
};

module.exports = {
    signIn: catchedAsync(signIn),
    signUp: catchedAsync(signUp)
};