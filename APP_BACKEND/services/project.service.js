const { getQueryResults, getResults, generateSelectSqlQuery } = require('../helpers/query.helper');
const conexion = require('../config/db');

const getAll = async () => {
    const { query } = generateSelectSqlQuery('trabajo');
    return await getResults(query, conexion);
};

const getOne = async (projectId) => {
    const { query, values } = generateSelectSqlQuery('trabajo', {
        id: projectId
    });
    return await getQueryResults(query, values, conexion);
};

// const getProjectFiles = async () => {

// };

// const postFileToProject = async () => {

// };

// const getProjectFile = async () => {

// };

// const deleteProjectFile = async () => {

// };

const searchProjects = async (queryParams) => {
    //FILTRAR CLAVES QUE NO TENGAN VALOR
    const filterParams = {};
    for (const key in queryParams) {
        if (queryParams.hasOwnProperty(key) && queryParams[key] !== null 
            && queryParams[key] !== undefined && queryParams[key] !== '')
            filterParams[key] = queryParams[key];
    }
    const { query, values } = generateSelectSqlQuery('trabajo', '');
    return await getQueryResults(query, values, conexion);
};

module.exports = {
    getAll,
    getOne,
    // getProjectFiles,
    // postFileToProject,
    // getProjectFile,
    // deleteProjectFile,
    searchProjects,
};  