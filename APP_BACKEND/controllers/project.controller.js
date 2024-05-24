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
        return responseError(res, 400, i18n.__('projects.error'));

    const project = {
        id: response.insertId,
        ...req.body
    };

    return responseMessage(res, 200, project);
};

const putProject = async (req, res, next) => {
    const projectId = req.params['id'];
    const data = req.body;

    const response = await projectService.updateOne({ projectId, userId: data['usuario'], data});

    if (response.affectedRows === 0)
        return responseError(res, 400, i18n.__('projects.updateError'));

    return responseMessage(res, 200, i18n.__('projects.updateSuccess'));
};

const deleteProject = async (req, res, next) => {
    const projectId = req.params['id'];
    const response = await projectService.deleteOne(projectId);
    
    if (response.affectedRows === 0)
        return responseError(res, 400, i18n.__('projects.notExists'));

    return responseMessage(res, 200, i18n.__('projects.removeSuccess'));
};

const updateViews = async (req, res, next) => {
    const projectId = req.params['id'];
    const project = await projectService.getOne(projectId);

    if (!project)
        return responseError(res, 400, i18n.__('projects.notExists'));

    const response = await projectService.updateProjectViews(project);

    if (response.affectedRows === 0)
        return responseError(res, 400, i18n.__('projects.updateViewsError'));

    return responseMessage(res, 200, i18n.__('projects.updateViewsSuccess'));
};

const findProject = async (req, res, next) => {
    const params = req.query;
    const projects = await projectService.searchProjects(params);
    return responseMessage(res, 200, projects);
};

module.exports = {
    getProjects: catchedAsync(getProjects),
    getProject: catchedAsync(getProject),
    postProject: catchedAsync(postProject),
    putProject: catchedAsync(putProject),
    deleteProject: catchedAsync(deleteProject),
    updateViews: catchedAsync(updateViews),
    findProject: catchedAsync(findProject),
};