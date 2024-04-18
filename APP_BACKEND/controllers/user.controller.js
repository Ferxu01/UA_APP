const { getAll, getOne, deleteOne } = require('../services/user.service');
const catchedAsync = require('../utils/catchedAsync');
const responseMessage = require('../utils/messages/responseMessage');
const responseError = require('../utils/messages/responseError');

const getUsers = async (req, res, next) => {
    const users = await getAll();

    if (users.length === 0)
        return responseError(res, 400, 'No existen usuarios registrados en el sistema');

    return responseMessage(res, 200, users);
};

const getUser = async (req, res, next) => {
    const id = Number(req.params['id']);
    const users = await getOne(id);
    
    if (users.length === 0)
        return responseError(res, 400, 'No existe el usuario en el sistema');

    return responseMessage(res, 200, users);
};

const updateUser = async (req, res, next) => {

};

const deleteUser = async (req, res, next) => {
    const id = Number(req.params['id']);
    const response = await deleteOne(id);

    if (response.affectedRows > 0)
        return responseMessage(res, 200, 'Tu cuenta se eliminó correctamente');
    else
        return responseError(res, 400, 'Este usuario no está registrado en el sistema');
};

module.exports = {
    getUsers: catchedAsync(getUsers),
    getUser: catchedAsync(getUser),
    updateUser: catchedAsync(updateUser),
    deleteUser: catchedAsync(deleteUser),
};