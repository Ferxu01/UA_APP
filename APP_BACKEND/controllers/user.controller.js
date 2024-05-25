const { userService } = require('../services');
const catchedAsync = require('../utils/catchedAsync');
const { userSchema } = require('../schemas');
const responseMessage = require('../utils/messages/responseMessage');
const responseError = require('../utils/messages/responseError');

const i18n = require('../config/i18n');
const { encriptaPassword } = require('../helpers/pass.helper');

const getUsers = async (req, res, next) => {
    const users = await userService.getAll();

    if (users.length === 0)
        return responseError(res, 400, i18n.__('users.notAvailable'));

    return responseMessage(res, 200, users);
};

const getUser = async (req, res, next) => {
    const id = Number(req.params['id']);
    const user = await userService.getOne(id);
    
    if (!user)
        return responseError(res, 400, i18n.__('users.notFound'));

    return responseMessage(res, 200, user);
};

const updatePassword = async (req, res, next) => {
    const userId = req.params['id'];
    const validatedResult = await userSchema.validateChangePasswordSchema(req.body);

    if (validatedResult.error)
        return responseError(res, 400, JSON.parse(validatedResult.error.message));

    const user = await userService.getOne(userId);
    
    if (!user)
        return responseError(res, 400, i18n.__('users.notFound'));

    const { password, password2 } = validatedResult.data;
    const encryptedPass = await encriptaPassword(password);

    const response = await userService.updateUserPassword({ userId, password: encryptedPass });

    if (response.affectedRows === 0)
        return responseError(res, 400, i18n.__('users.updatePasswordError'));

    return responseMessage(res, 200, i18n.__('users.updatePasswordSuccess'));
};

const updateUser = async (req, res, next) => {
    const userId = req.params['id'];
    const user = await userService.getOne(userId);
    
    if (!user)
        return responseError(res, 400, i18n.__('users.notFound'));

    const { nombre, apellidos, fechaNacimiento, email, estudio, curso } = req.body;

    const response = await userService.updateOne(userId, {
        nombre, 
        apellidos, 
        fechaNacimiento, 
        email, 
        estudio, 
        curso
    });
    console.log(response);

    if (response.affectedRows === 0)
        return responseError(res, 400, i18n.__('users.updateUserError'));

    return responseMessage(res, 200, i18n.__('users.updateUserSuccess'));
};

const deleteUser = async (req, res, next) => {
    const id = Number(req.params['id']);
    const response = await userService.deleteOne(id);

    if (response.affectedRows === 0)
        return responseError(res, 400, i18n.__('users.notRegistered'));

    return responseMessage(res, 200, i18n.__('users.removeSuccess'));
};

module.exports = {
    getUsers: catchedAsync(getUsers),
    getUser: catchedAsync(getUser),
    updatePassword: catchedAsync(updatePassword),
    updateUser: catchedAsync(updateUser),
    deleteUser: catchedAsync(deleteUser),
};