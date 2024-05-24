const { getQueryResults, getResults, generateSelectSqlQuery, generateInsertSqlQuery, generateDeleteSqlQuery } = require('../helpers/query.helper');
const conexion = require('../config/db');

const getAll = async () => {
    const { query } = generateSelectSqlQuery('etiqueta');
    return await getResults(query, conexion);
};

const postOne = async ({ texto }) => {
    const { query, values } = generateInsertSqlQuery('etiqueta', {
        texto
    });
    return await getQueryResults(query, values, conexion);
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

const getTagsFromProject = async ({ projectId }) => {
    const { query, values } = generateSelectSqlQuery('etiquetado', {
        id_trabajo: projectId,
    }, [
        {
            idFieldName: 'id_trabajo',
            tablename: 'trabajo',
        },
        {
            idFieldName: 'id_etiqueta',
            tablename: 'etiqueta',
        }
    ]);
    return await getQueryResults(query, values, conexion);
};

const getOneTagged = async ({ projectId, tagId }) => {
    const { query, values } = generateSelectSqlQuery('etiquetado', {
        id_trabajo: projectId,
        id_etiqueta: tagId
    });
    return await getQueryResults(query, values, conexion);
};

module.exports = {
    getAll,
    postOne,
    postOneToProject,
    deleteOneFromProject,
    getOneTagged,
    getTagsFromProject,
};