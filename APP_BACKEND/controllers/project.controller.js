const { projectService } = require('../services');
const catchedAsync = require('../utils/catchedAsync');
const responseError = require('../utils/messages/responseError');
const responseMessage = require('../utils/messages/responseMessage');

const i18n = require('../config/i18n');

const getProjects = async (req, res, next) => {
    const projects = await projectService.getAll();

    if (projects.length === 0)
        return responseError(res, 400, i18n.__('projects.notFound'));

    return responseMessage(res, 200, projects);
};

const getProject = async (req, res, next) => {
    const projectId = req.params['id'];
    const project = await projectService.getOne(projectId);

    if (!project)
        return responseError(res, 400, i18n.__('projects.notExists'));

    return responseMessage(res, 200, project);
};

const postProject = async (req, res, next) => {
    const data = req.body;

    const response = await projectService.postNewProject(data);

    if (response.insertId === 0)
        return responseError(res, 400, 'Hubo errores al subir el trabajo');

    const project = {
        id: response.insertId,
        ...req.body
    };

    return responseMessage(res, 200, project);
};

const deleteProject = async (req, res, next) => {
    const projectId = req.params['id'];
    const response = await projectService.deleteOne(projectId);
    
    if (response.affectedRows === 0)
        return responseError(res, 400, i18n.__('projects.notExists'));

    return responseMessage(res, 200, i18n.__('projects.removeSuccess'));
};

const findProject = async (req, res, next) => {
    const params = req.query;
    //console.log(params);
    const projects = await projectService.searchProjects(params);
    //console.log(projects);
    return responseMessage(res, 200, projects);
};

module.exports = {
    getProjects: catchedAsync(getProjects),
    getProject: catchedAsync(getProject),
    postProject: catchedAsync(postProject),
    deleteProject: catchedAsync(deleteProject),
    findProject: catchedAsync(findProject),
};