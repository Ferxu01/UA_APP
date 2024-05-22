const catchedAsync = require('../utils/catchedAsync');
const { fileService } = require('../services');
const responseMessage = require('../utils/messages/responseMessage');
const fileUtils = require('../utils/file');
const responseError = require('../utils/messages/responseError');

const i18n = require('../config/i18n');

const getFiles = async (req, res, next) => {
    const projectId = req.params['id'];
    const files = await fileService.getAllFromProject(projectId);

    if (files.length === 0)
        return responseMessage(res, 200, i18n.__('files.noAttachedFiles'));

    return responseMessage(res, 200, files);
};

const postFile = async (req, res, next) => {
    const projectId = req.params['id'];
    const { descripcion } = req.body;
    const file = req.files.file;
    console.log(file);

    const data = fileUtils.uploadFile(file);
    console.log(data);
    if (!data.filename && !data.filepath)
        return responseError(res, 400, i18n.__('files.missingInfo'));

    const { filename, filepath } = data;
    //console.log(data);

    const response = await fileService.postFileToProject({
        projectId,
        description: descripcion,
        filename,
        filepath,
    });
    console.log(response);

    if (response.affectedRows <= 0)
        return responseError(res, 400, i18n.__('files.uploadError'));

    const fileId = response.insertId;

    return responseMessage(res, 200, i18n.__('files.uploadSuccess'));
};

const putFile = async (req, res, next) => {
    const { projectId, fileId } = req.params;
    const { descripcion } = req.body;
    const file = req.files.file;

    const data = fileUtils.uploadFile(file);
    console.log(data);
    if (!data.filename && !data.filepath)
        return responseError(res, 400, i18n.__('files.missingInfo'));

    const { filename, filepath } = data;

    const response = await fileService.updateFileOnProject({
        projectId, 
        fileId,
        description: descripcion,
        filename,
        filepath,
    });
    console.log(response);

    if (response.affectedRows <= 0)
        return responseError(res, 400, i18n.__('files.updateError'));

    return responseMessage(res, 200, i18n.__('files.updateSuccess'));
};

const deleteFile = async (req, res, next) => {
    const { projectId, fileId } = req.params;
    const response = await fileService.deleteOneFromProject({ projectId, fileId });
    
    if (response.affectedRows <= 0)
        return responseError(res, 400, i18n.__('files.removeError'));

    return responseMessage(res, 200, i18n.__('files.removeSuccess'));
};

module.exports = {
    getFiles: catchedAsync(getFiles),
    postFile: catchedAsync(postFile),
    putFile: catchedAsync(putFile),
    deleteFile: catchedAsync(deleteFile),
};