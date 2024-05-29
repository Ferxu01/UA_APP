const catchedAsync = require('../utils/catchedAsync');
const { fileService } = require('../services');
const responseMessage = require('../utils/messages/responseMessage');
const fileUtils = require('../utils/file');
const responseError = require('../utils/messages/responseError');

const i18n = require('../config/i18n');

const getFiles = async (req, res, next) => {
    const projectId = req.params['id'];
    const files = await fileService.getAllFromProject(projectId);

    const responses = await Promise.all(files.map(async (file) => {
        let img = await fileUtils.getFile(file.nombre);
        
        return {
            ...file,
            imgData: img
        };
    }));

    if (responses.length === 0)
        return responseMessage(res, 200, i18n.__('files.noAttachedFiles'));

    return responseMessage(res, 200, responses);
};

const postFile = async (req, res, next) => {
    const projectId = req.params['id'];
    const { data, fileName, descripcion, alternativo, portada } = req.body;
    
    const resp = fileUtils.uploadFile({ data, filename: fileName, portada });
    if (!resp.filename && !resp.filepath)
        return responseError(res, 400, i18n.__('files.missingInfo'));

    const { filename, filepath } = resp;

    const response = await fileService.postFileToProject({
        projectId,
        description: descripcion,
        filename,
        filepath,
        alternativo
    });

    if (response.affectedRows === 0)
        return responseError(res, 400, i18n.__('files.uploadError'));

    return responseMessage(res, 200, i18n.__('files.uploadSuccess'));
};

const putFile = async (req, res, next) => {
    const { projectId, fileId } = req.params;
    const { data, fileName, descripcion, alternativo } = req.body;

    const currentFile = await fileService.getOne(fileId);

    if (!currentFile)
        return responseError(res, 400, i18n.__('files.notFound'));

    const resp = fileUtils.uploadFile({ data, filename: fileName });
    if (!resp.filename && !resp.filepath)
        return responseError(res, 400, i18n.__('files.missingInfo'));

    const { filename, filepath } = resp;

    const response = await fileService.updateFileOnProject({
        projectId, 
        fileId,
        description: descripcion,
        filename,
        filepath,
        alternativo,
    });

    if (response.affectedRows <= 0)
        return responseError(res, 400, i18n.__('files.updateError'));

    fileUtils.removeFileFromDirectory(currentFile.nombre);

    return responseMessage(res, 200, i18n.__('files.updateSuccess'));
};

const deleteFile = async (req, res, next) => {
    const { projectId, fileId } = req.params;
    const file = await fileService.getOne(fileId);

    if (!file)
        return responseError(res, 400, i18n.__('files.notFound'));

    const response = await fileService.deleteOneFromProject({ projectId, fileId });
    
    if (response.affectedRows <= 0)
        return responseError(res, 400, i18n.__('files.removeError'));

    fileUtils.removeFileFromDirectory(file.nombre);

    return responseMessage(res, 200, i18n.__('files.removeSuccess'));
};

module.exports = {
    getFiles: catchedAsync(getFiles),
    postFile: catchedAsync(postFile),
    putFile: catchedAsync(putFile),
    deleteFile: catchedAsync(deleteFile),
};