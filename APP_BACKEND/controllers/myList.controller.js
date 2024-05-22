const { myListService } = require('../services');
const catchedAsync = require('../utils/catchedAsync');
const responseError = require('../utils/messages/responseError');
const responseMessage = require('../utils/messages/responseMessage');

const getFavs = async (req, res, next) => {
    const { userId } = req.params;
    const favs = await myListService.getFavProjects(userId);
    if (favs.length === 0)
        return responseError(res, 400, 'No has añadido trabajos a favoritos');

    return responseMessage(res, 200, favs);
};

const postFav = async (req, res, next) => {
    const { user, project } = req.body;
    const response = await myListService.postProjectToFav({ userId: user, projectId: project });

    if (response.insertId === 0)
        return responseError(res, 400, 'El trabajo no pudo añadirse a favoritos');

    return responseMessage(res, 200, 'El trabajo se añadió a tu lista de favoritos');
};

const deleteFav = async (req, res, next) => {
    const { projectId, userId } = req.params;
    const response = await myListService.deleteProjectFromFav({ projectId, userId });

    if (response.affectedRows === 0)
        return responseError(res, 400, 'El trabajo no pudo eliminarse de tu lista de favoritos');

    return responseMessage(res, 200, 'El trabajo se eliminó de tu lista de favoritos');
};

module.exports = {
    getFavs: catchedAsync(getFavs),
    postFav: catchedAsync(postFav),
    deleteFav: catchedAsync(deleteFav),
};