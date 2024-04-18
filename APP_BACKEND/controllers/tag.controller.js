const { getAll, deleteOneFromProject } = require('../services/tag.service');
const catchedAsync = require('../utils/catchedAsync');
const responseError = require('../utils/messages/responseError');
const responseMessage = require('../utils/messages/responseMessage');

const getTags = async (req, res, next) => {
    const tags = await getAll();
    
    if (tags.length === 0)
        return responseError(res, 400, 'No se han encontrado las etiquetas');

    return responseMessage(res, 200, tags);
};

const postTagProject = async (req, res, next) => {
    const projectId = req.params['id'];
    // const 
    // const response = await 
};

const deleteTagFromProject = async (req, res, next) => {
    const { tagId, projectId } = req.params;
    const response = await deleteOneFromProject({ tagId, projectId });

    if (response.affectedRows > 0)
        return responseMessage(res, 200, 'La etiqueta se eliminó correctamente del proyecto')
    else
        return responseError(res, 400, 'Hubo problemas al eliminar la etiqueta del proyecto');
};

module.exports = {
    getTags: catchedAsync(getTags),
    postTagProject: catchedAsync(postTagProject),
    deleteTagFromProject: catchedAsync(deleteTagFromProject),
};