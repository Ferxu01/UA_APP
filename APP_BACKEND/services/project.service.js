const { getQueryResults, getResults, generateSelectSqlQuery } = require('../helpers/query.helper');
const conexion = require('../config/db');

const getAll = async () => {
    const { query } = generateSelectSqlQuery('trabajo');
    return await getResults(query, conexion);
};

/**
* Obtener todos los comentarios de un proyecto
*/
const getAllFromProject = async (projectId) => {
    const { query, values } = generateSelectSqlQuery('comentario', {
        id_trabajo: projectId
    });
    return await getQueryResults(query, values, conexion);
};

const postCommentToProject = async (projectId) => {

};

const deleteOneFromProject = async (projectId, commentId) => {

};

const getProjectFiles = async () => {

};

const postFileToProject = async () => {

};

const getProjectFile = async () => {

};

const deleteProjectFile = async () => {

};

module.exports = {
    getAll,
    getAllFromProject,
    postCommentToProject,
    deleteOneFromProject,
    getProjectFiles,
    postFileToProject,
    getProjectFile,
    deleteProjectFile,
}