const { tagService, projectService } = require('../services');
const catchedAsync = require('../utils/catchedAsync');
const responseError = require('../utils/messages/responseError');
const responseMessage = require('../utils/messages/responseMessage');

const getTags = async (req, res, next) => {
    const tags = await tagService.getAll();
    
    if (tags.length === 0)
        return responseError(res, 400, 'No se han encontrado las etiquetas');

    return responseMessage(res, 200, tags);
};

const postTag = async (req, res, next) => {
    const { texto } = req.body;
    const response = await tagService.postOne({ texto });
    
    if (response.affectedRows > 0)
        return responseMessage(res, 200, 'La etiqueta se añadió correctamente');
    else
        return responseError(res, 400, 'Hubo problemas al crear la etiqueta');
};

const getProjectTags = async (req, res, next) => {
    const projectId = req.params['id'];
    const etiquetas = await tagService.getTagsFromProject({ projectId });

    if (etiquetas.length === 0)
        return responseError(res, 400, 'Este proyecto no tiene etiquetas');
    else {
        return responseMessage(res, 200, etiquetas);
    }
};

const postTagProject = async (req, res, next) => {
    const { tagId, projectId } = req.params;
    const tags = await tagService.getOneTagged({ projectId, tagId });
    const project = await projectService.getOne(projectId);

    if (!project)
        return responseError(res, 400, 'No existe el proyecto donde quieres añadir la etiqueta');

    if (tags.length > 0)
        return responseError(res, 400, 'Ya has añadido esta etiqueta al proyecto');
    else {
        const response = await tagService.postOneToProject({ tagId, projectId });
        console.log(response);

        if (response.affectedRows > 0)
            return responseMessage(res, 200, 'La etiqueta se añadió correctamente al proyecto');
        else
            return responseError(res, 400, 'Hubo problemas al añadir la etiqueta al proyecto');
    }
};

const deleteTagFromProject = async (req, res, next) => {
    const { tagId, projectId } = req.params;
    const response = await tagService.deleteOneFromProject({ tagId, projectId });

    if (response.affectedRows > 0)
        return responseMessage(res, 200, 'La etiqueta se eliminó correctamente del proyecto');
    else
        return responseError(res, 400, 'No existe esta etiqueta en el proyecto');
};

module.exports = {
    getTags: catchedAsync(getTags),
    postTag: catchedAsync(postTag),
    postTagProject: catchedAsync(postTagProject),
    deleteTagFromProject: catchedAsync(deleteTagFromProject),
    getProjectTags: catchedAsync(getProjectTags),
};