const { getQueryResults, generateSelectSqlQuery, generateInsertSqlQuery, generateDeleteSqlQuery } = require('../helpers/query.helper');
const conexion = require('../config/db');

const getFavProjects = async (userId) => {
    const { query, values } = generateSelectSqlQuery('mi_lista', {
        id_usuario: userId
    }, [
        {
            idFieldName: 'id_usuario',
            tablename: 'usuario',
        },
        {
            idFieldName: 'id_trabajo',
            tablename: 'trabajo',
        }
    ]);
    return await getQueryResults(query, values, conexion);
};

const postProjectToFav = async ({ userId, projectId }) => {
    const { query, values } = generateInsertSqlQuery('mi_lista', {
        id_usuario: userId,
        id_trabajo: projectId,
    });
    return await getQueryResults(query, values, conexion);
};

const deleteProjectFromFav = async ({ projectId, userId }) => {
    const { query, values } = generateDeleteSqlQuery('mi_lista', {
        id_usuario: userId,
        id_trabajo: projectId,
    });
    return await getQueryResults(query, values, conexion);
};

module.exports = {
    getFavProjects,
    postProjectToFav,
    deleteProjectFromFav,
};