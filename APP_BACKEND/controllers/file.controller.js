const catchedAsync = require('../utils/catchedAsync');
const { fileService } = require('../services');
const responseMessage = require('../utils/messages/responseMessage');
const fileUtils = require('../utils/file');
const responseError = require('../utils/messages/responseError');

const getFiles = async (req, res, next) => {
    const projectId = req.params['id'];
    const files = await fileService.getAllFromProject(projectId);

    if (files.length === 0)
        return responseMessage(res, 200, 'Este proyecto no tiene ficheros adjuntos');

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
        return responseError(res, 400, 'Falta información sobre el fichero');

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
        return responseError(res, 400, 'El fichero no se pudo subir');

    const fileId = response.insertId;

    return responseMessage(res, 200, 'El fichero se subió correctamente');
};

const putFile = async (req, res, next) => {
    const { projectId, fileId } = req.params;
    const { descripcion } = req.body;
    const file = req.files.file;

    const data = fileUtils.uploadFile(file);
    console.log(data);
    if (!data.filename && !data.filepath)
        return responseError(res, 400, 'Falta información sobre el fichero');

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
        return responseError(res, 400, 'El fichero no se pudo actualizar');

    return responseMessage(res, 200, 'El fichero se ha editado correctamente');
};

const deleteFile = async (req, res, next) => {
    const { projectId, fileId } = req.params;
    const response = await fileService.deleteOneFromProject({ projectId, fileId });
    
    if (response.affectedRows <= 0)
        return responseError(res, 400, 'No se ha podido eliminar el fichero. Puede que no se haya encontrado');

    return responseMessage(res, 200, 'El fichero se eliminó correctamente');
};

module.exports = {
    getFiles: catchedAsync(getFiles),
    postFile: catchedAsync(postFile),
    putFile: catchedAsync(putFile),
    deleteFile: catchedAsync(deleteFile),
};