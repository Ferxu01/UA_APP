const { getQueryResults, getResults, generateSelectSqlQuery, generateUpdateSqlQuery, generateDeleteSqlQuery } = require('../helpers/query.helper');
const conexion = require('../config/db');

const getAll = async () => {
    const { query } = generateSelectSqlQuery('usuario');
    return await getResults(query, conexion);
};

const getOne = async (id) => {
    const { query, values } = generateSelectSqlQuery('usuario', {
        id: id,
    });
    const results = await getQueryResults(query, values, conexion);
    return results[0];
};

const updateUserPassword = async ({ userId, password }) => {
    const { query, values } = generateUpdateSqlQuery('usuario', {
        pwd: password,
    },
    {
        id: userId,
    });
    return await getQueryResults(query, values, conexion);
};

const updateOne = async (userId, { nombre, apellidos, fechaNacimiento, email, estudio, curso }) => {
    const { query, values } = generateUpdateSqlQuery('usuario', {
        nombre,
        apellidos,
        fechaNacimiento,
        correo: email,
        estudio,
        curso
    },
    {
        id: userId,
    });
    return await getQueryResults(query, values, conexion);
};

const updateUserAvatar = async ({ userId, imgName }) => {
    const { query, values } = generateUpdateSqlQuery('usuario', {
        imagen_perfil: imgName,
    },
    {
        id: userId,
    });
    return await getQueryResults(query, values, conexion);
};

const deleteOne = async (id) => {
    const { query, values } = generateDeleteSqlQuery('usuario', {
        id: id
    });
    return await getQueryResults(query, values, conexion);
};

const getUserByEmail = async (email) => {
    const { query, values } = generateSelectSqlQuery('usuario',{
        correo: email,
    });
    const results = await getQueryResults(query, values, conexion);
    return results[0];
};

module.exports = {
    getAll,
    getOne,
    updateUserPassword,
    updateOne,
    updateUserAvatar,
    deleteOne,
    getUserByEmail,
};