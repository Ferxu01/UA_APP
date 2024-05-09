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

const updateOne = async (id, params) => {

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
    updateOne,
    deleteOne,
    getUserByEmail,
};