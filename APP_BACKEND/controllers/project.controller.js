const { projectService } = require('../services');
const catchedAsync = require('../utils/catchedAsync');
const responseError = require('../utils/messages/responseError');
const responseMessage = require('../utils/messages/responseMessage');

const getProjects = async (req, res, next) => {
    const projects = await projectService.getAll();
    return responseMessage(res, 200, projects);
};

const getProject = async (req, res, next) => {
    const projectId = req.params['id'];
    const project = await projectService.getOne(projectId);
    return responseMessage(res, 200, project);
};

const findProject = async (req, res, next) => {
    const params = req.query;
    const projects = await projectService.searchProjects(params);
    //console.log(projects);
    return responseMessage(res, 200, projects);
};

module.exports = {
    getProjects: catchedAsync(getProjects),
    getProject: catchedAsync(getProject),
    findProject: catchedAsync(findProject),
};