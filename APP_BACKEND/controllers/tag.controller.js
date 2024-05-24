const { tagService, projectService } = require('../services');
const catchedAsync = require('../utils/catchedAsync');
const responseError = require('../utils/messages/responseError');
const responseMessage = require('../utils/messages/responseMessage');

const i18n = require('../config/i18n');

const getTags = async (req, res, next) => {
    const tags = await tagService.getAll();
    
    if (tags.length === 0)
        return responseError(res, 400, i18n.__('tags.notAvailable'));

    return responseMessage(res, 200, tags);
};

const postTag = async (req, res, next) => {
    const { texto } = req.body;
    const response = await tagService.postOne({ texto });
    
    if (response.affectedRows > 0)
        return responseMessage(res, 200, i18n.__('tags.addSuccess'));
    else
        return responseError(res, 400, i18n.__('tags.addError'));
};

const getProjectTags = async (req, res, next) => {
    const projectId = req.params['id'];
    const etiquetas = await tagService.getTagsFromProject({ projectId });

    if (etiquetas.length === 0)
        return responseError(res, 400, i18n.__('tags.notFound'));

    return responseMessage(res, 200, etiquetas);
};

const postTagProject = async (req, res, next) => {
    const { tagId, projectId } = req.params;
    const tags = await tagService.getOneTagged({ projectId, tagId });
    const project = await projectService.getOne(projectId);

    if (!project)
        return responseError(res, 400, i18n.__('tags.notExists'));

    if (tags.length > 0)
        return responseError(res, 400, i18n.__('tags.duplicatedTag'));

    const response = await tagService.postOneToProject({ tagId, projectId });

    if (response.affectedRows === 0)
        return responseError(res, 400, i18n.__('tags.addToProjectError'));
    
    return responseMessage(res, 200, i18n.__('tags.addToProjectSuccess'));
};

const deleteTagFromProject = async (req, res, next) => {
    const { tagId, projectId } = req.params;
    const response = await tagService.deleteOneFromProject({ tagId, projectId });

    if (response.affectedRows === 0)
        return responseError(res, 400, i18n.__('tags.removeFromProjectError'));
    
    return responseMessage(res, 200, i18n.__('tags.removeFromProjectSuccess'));
};

module.exports = {
    getTags: catchedAsync(getTags),
    postTag: catchedAsync(postTag),
    postTagProject: catchedAsync(postTagProject),
    deleteTagFromProject: catchedAsync(deleteTagFromProject),
    getProjectTags: catchedAsync(getProjectTags),
};