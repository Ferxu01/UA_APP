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

const getOne = async (fileId) => {
    const { query, values } = generateSelectSqlQuery('archivo', {
        id: fileId,
    });
    const results = await getQueryResults(query, values, conexion);
    return results[0];
};

const postFileToProject = async ({ projectId, description, filename, filepath, alternativo }) => {
    const { query, values } = generateInsertSqlQuery('archivo', {
        id_trabajo: projectId,
        descripcion: description,
        nombre: filename,
        ruta_archivo: filepath,
        alternativo,
    });
    return await getQueryResults(query, values, conexion);
};

const updateFileOnProject = async ({ projectId, fileId, description, filename, filepath, alternativo }) => {
    const { query, values } = generateUpdateSqlQuery('archivo', {
        descripcion: description,
        nombre: filename,
        ruta_archivo: filepath,
        alternativo,
    }, {
        id_trabajo: projectId,
        id: fileId,
    });
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
    getOne,
    postFileToProject,
    updateFileOnProject,
    deleteOneFromProject,
}