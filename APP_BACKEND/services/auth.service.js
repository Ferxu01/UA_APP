const { getQueryResults, generateSelectSqlQuery, generateInsertSqlQuery, generateUpdateSqlQuery } = require('../helpers/query.helper');
const conexion = require('../config/db');

const postLogin = async ({ email }) => {
    const { query, values } = generateSelectSqlQuery('usuario', {
        correo: email,
    });
    const results = await getQueryResults(query, values, conexion);
    return results[0];
};

const postRegister = async ({ nombre, apellidos, curso, estudio, email, password, fechaNacimiento }) => {
    const { query, values } = generateInsertSqlQuery('usuario', {
        correo: email,
        pwd: password,
        fechaNacimiento,
        curso,
        estudio,
        nombre,
        apellidos
    });
    return await getQueryResults(query, values, conexion);
};

module.exports = {
    postLogin,
    postRegister
};