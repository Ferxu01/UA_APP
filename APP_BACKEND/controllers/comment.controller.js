const catchedAsync = require('../utils/catchedAsync');
const { projectService, commentService } = require('../services');
const commentSchema = require('../schemas/comment');
const responseMessage = require('../utils/messages/responseMessage');
const responseError = require('../utils/messages/responseError');

const i18n = require('../config/i18n');

const getProjectComments = async (req, res, next) => {
    const projectId = req.params['id'];
    const projectComments = await commentService.getAllFromProject(projectId);

    if (projectComments.length === 0)
        return responseMessage(res, 200, i18n.__('comments.notFound'));

    return responseMessage(res, 200, projectComments);
};

const postComment = async (req, res, next) => {
    const validatedResult = await commentSchema.validateComment(req.body);
    const projectId = req.params['id'];

    if (validatedResult.error)
        return responseError(res, 400, JSON.parse(validatedResult.error.message));

    const project = await projectService.getOne(projectId);
    if (!project)
        return responseError(res, 400, i18n.__('comments.projectDontExist'));

    //TODO: COMPROBAR QUE SE PUEDEN SUBIR COMENTARIOS
    if (project.comentarios === 0)
        return responseError(res, 400, i18n.__('comments.notAllowed'));

    const response = await commentService.postCommentToProject({
        id_trabajo: projectId,
        ...validatedResult,
    });

    if (response.affectedRows <= 0)
        return responseError(res, 400, i18n.__('comments.added'));

    return responseMessage(res, 200, {
        id: response.insertId,
        texto: validatedResult.texto,
    });
};

const deleteComment = async (req, res, next) => {
    const { projectId, commentId } = req.params;
    const userId = req.body['userId'];
    const response = await commentService.deleteOneFromProject({
        projectId,
        commentId,
        userId
    });

    if (response.affectedRows === 0)
        return responseError(res, 400, i18n.__('comments.notExist'));

    return responseMessage(res, 200, i18n.__('comments.success'));
};

module.exports = {
    getProjectComments: catchedAsync(getProjectComments),
    postComment: catchedAsync(postComment),
    deleteComment: catchedAsync(deleteComment),
};