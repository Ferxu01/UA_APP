const { getQueryResults, generateInsertSqlQuery, generateSelectSqlQuery, generateDeleteSqlQuery } = require('../helpers/query.helper');
const conexion = require('../config/db');

/**
* Obtener todos los comentarios de un proyecto
*/
const getAllFromProject = async (projectId) => {
    const { query, values } = generateSelectSqlQuery('comentario', {
        id_trabajo: projectId
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

const postCommentToProject = async ({ id_usuario, id_trabajo, texto }) => {
    const { query, values } = generateInsertSqlQuery('comentario', {
        id_usuario,
        id_trabajo,
        texto
    });
    return await getQueryResults(query, values, conexion);
};

const deleteOneFromProject = async ({ projectId, commentId, userId }) => {
    const { query, values } = generateDeleteSqlQuery('comentario', {
        id_usuario: userId,
        id_trabajo: projectId,
        id: commentId,
    });
    return await getQueryResults(query, values, conexion);
};

module.exports = {
    getAllFromProject,
    postCommentToProject,
    deleteOneFromProject,
}