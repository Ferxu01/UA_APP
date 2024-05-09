const { generateSelectSqlQuery, generateInsertSqlQuery, generateDeleteSqlQuery, getQueryResults, generateUpdateSqlQuery } = require('../helpers/query.helper');
const conexion = require('../config/db');

/**
* Obtener todos los ficheros de un proyecto
*/
const getAllFromProject = async (projectId) => {
    const { query, values } = generateSelectSqlQuery('archivo', {
        id_trabajo: projectId,
    });
    return await getQueryResults(query, values, conexion);
};

const postFileToProject = async ({ projectId, description, filename, filepath }) => {
    const { query, values } = generateInsertSqlQuery('archivo', {
        id_trabajo: projectId,
        descripcion: description,
        nombre: filename,
        ruta_archivo: filepath,
    });
    return await getQueryResults(query, values, conexion);
};

const updateFileOnProject = async ({ projectId, fileId, description, filename, filepath }) => {
    const { query, values } = generateUpdateSqlQuery('archivo', {
        descripcion: description,
        nombre: filename,
        ruta_archivo: filepath,
    }, {
        id_trabajo: projectId,
        id: fileId,
    });
    console.log(query);
    console.log(values);
    return await getQueryResults(query, values, conexion);
};

const deleteOneFromProject = async ({ projectId, fileId }) => {
    const { query, values } = generateDeleteSqlQuery('archivo', {
        id_trabajo: projectId,
        id: fileId,
    });
    return await getQueryResults(query, values, conexion);
};

module.exports = {
    getAllFromProject,
    postFileToProject,
    updateFileOnProject,
    deleteOneFromProject,
}