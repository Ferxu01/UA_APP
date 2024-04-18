const { getQueryResults, getResults, generateSelectSqlQuery, generateInsertSqlQuery, generateDeleteSqlQuery } = require('../helpers/query.helper');
const conexion = require('../config/db');

const getAll = async () => {
    const { query } = generateSelectSqlQuery('etiqueta');
    return await getResults(query, conexion);
};

const postOneToProject = async ({ tagId, projectId }) => {
    const { query, values } = generateInsertSqlQuery('etiquetado', {
        id_trabajo: projectId,
        id_etiqueta: tagId
    });
    return await getQueryResults(query, values, conexion);
};

const deleteOneFromProject = async ({ tagId, projectId }) => {
    const { query, values } = generateDeleteSqlQuery('etiquetado', {
        id_trabajo: projectId,
        id_etiqueta: tagId
    });
    return await getQueryResults(query, values, conexion);
};

module.exports = {
    getAll,
    postOneToProject,
    deleteOneFromProject,
};