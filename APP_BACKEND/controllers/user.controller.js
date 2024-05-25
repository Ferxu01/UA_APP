const { getAll, getOne, deleteOne } = require('../services/user.service');
const catchedAsync = require('../utils/catchedAsync');
const responseMessage = require('../utils/messages/responseMessage');
const responseError = require('../utils/messages/responseError');

const i18n = require('../config/i18n');

const getUsers = async (req, res, next) => {
    const users = await getAll();

    if (users.length === 0)
        return responseError(res, 400, i18n.__('users.notAvailable'));

    return responseMessage(res, 200, users);
};

const getUser = async (req, res, next) => {
    const id = Number(req.params['id']);
    const user = await getOne(id);
    
    if (!user)
        return responseError(res, 400, i18n.__('users.notFound'));

    return responseMessage(res, 200, user);
};

const updateUser = async (req, res, next) => {

};

const deleteUser = async (req, res, next) => {
    const id = Number(req.params['id']);
    const response = await deleteOne(id);

    if (response.affectedRows === 0)
        return responseError(res, 400, i18n.__('users.notRegistered'));

    return responseMessage(res, 200, i18n.__('users.removeSuccess'));
};

module.exports = {
    getUsers: catchedAsync(getUsers),
    getUser: catchedAsync(getUser),
    updateUser: catchedAsync(updateUser),
    deleteUser: catchedAsync(deleteUser),
};