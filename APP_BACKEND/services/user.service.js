const { getQueryResults, generateSelectSqlQuery, generateInsertSqlQuery, generateUpdateSqlQuery } = require('../helpers/query.helper');
const conexion = require('../config/db');

const getUserByEmail = async (email) => {
    const { query, values } = generateSelectSqlQuery('usuario',{
        correo: email,
    });

    return await getQueryResults(query, values, conexion);
};

module.exports = {
    getUserByEmail,
};