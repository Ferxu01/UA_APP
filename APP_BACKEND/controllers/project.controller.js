const { getAll, deleteOneFromProject, postCommentToProject } = require('../services/project.service');
const catchedAsync = require('../utils/catchedAsync');
const responseMessage = require('../utils/messages/responseMessage');

const getProjects = async (req, res, next) => {
    const projects = await getAll();
    return responseMessage(res, 200, projects);
};

const getProjectComments = async (req, res, next) => {
    const projectId = req.params['id'];
    const projectComments = await getAllFromProject(projectId);
    return responseMessage(res, 200, projectComments);
};

const postComment = async (req, res, next) => {
    const projectId = req.params['id'];
    const response = await postCommentToProject(projectId);
    return responseMessage(res, 200, response);
};

const deleteComment = async (req, res, next) => {
    const { projectId, commentId } = req.params;
    const response = await deleteOneFromProject(projectId, commentId);
    return responseMessage(res, 200, response);
};

const getFiles = async (req, res, next) => {

};

const postFile = async (req, res, next) => {

};

const getFile = async (req, res, next) => {

};

const deleteFile = async (req, res, next) => {

};

module.exports = {
    getProjects: catchedAsync(getProjects),
    getProjectComments: catchedAsync(getProjectComments),
    postComment: catchedAsync(postComment),
    deleteComment: catchedAsync(deleteComment),
    getFiles: catchedAsync(getFiles),
    postFile: catchedAsync(postFile),
    getFile: catchedAsync(getFile),
    deleteFile: catchedAsync(deleteFile),
};