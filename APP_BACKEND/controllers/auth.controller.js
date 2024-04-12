const moment = require('moment');
const { postLogin, postRegister } = require('../services/auth.service');
const { getUserByEmail } = require('../services/user.service');
const { userSchema } = require('../schemas/index');
const { generaToken } = require('../helpers/token.helper');
const { encriptaPassword, comparaPassword } = require('../helpers/pass.helper');
const responseError = require('../utils/messages/responseError');
const responseAuth = require('../utils/messages/responseAuth');
const catchedAsync = require('../utils/catchedAsync');

const signUp = async (req, res, next) => {
    const validatedResult = await userSchema.validateRegister(req.body);

    if (validatedResult.error)
        return responseError(res, 400, JSON.parse(validatedResult.error.message));

    const { email, password } = validatedResult.data;
    const usersCount = await getUserByEmail(email);

    if (usersCount.length === 0) {
        const encryptedPass = await encriptaPassword(password);

        const usuario = {
            ...validatedResult.data,
            password: encryptedPass,
        };
        delete usuario.password2;

        const response = await postRegister(usuario);
        usuario.id = response.insertId;

        const token = generaToken(); // Generar UUID con libreria crypto
        return responseAuth(res, 200, token, usuario);
    } else {
        return responseError(res, 400, 'Este email ya se ha registrado en el sistema');
    }
};

const signIn = async (req, res, next) => {
    const validatedResult = await userSchema.validateLogin(req.body);
    
    if (validatedResult.error)
        return responseError(res, 400, JSON.parse(validatedResult.error.message));
    
    const response = await postLogin(validatedResult.data);

    if (response.length === 0) {
        return responseError(res, 400, 'No se ha encontrado el usuario con ese email');
    } else {
        const { password } = validatedResult.data;
        const usuario = response[0];
        const equalPass = await comparaPassword(password, usuario.pwd);
        delete usuario.pwd;

        if (equalPass) {
            const token = generaToken(); // Generar UUID con libreria crypto
            return responseAuth(res, 200, token, usuario);
        } else {
            return responseError(res, 401, 'La contraseña es incorrecta');
        }
    }
};

module.exports = {
    signIn: catchedAsync(signIn),
    signUp: catchedAsync(signUp)
};