const { myListService } = require('../services');
const catchedAsync = require('../utils/catchedAsync');
const responseError = require('../utils/messages/responseError');
const responseMessage = require('../utils/messages/responseMessage');

const i18n = require('../config/i18n');

const getFavs = async (req, res, next) => {
    const { userId } = req.params;
    const favs = await myListService.getFavProjects(userId);
    if (favs.length === 0)
        return responseError(res, 400, i18n.__('favourites.notExists'));

    return responseMessage(res, 200, favs);
};

const postFav = async (req, res, next) => {
    const { user, project } = req.body;
    const response = await myListService.postProjectToFav({ userId: user, projectId: project });

    if (response.insertId === 0)
        return responseError(res, 400, i18n.__('favourites.addError'));

    return responseMessage(res, 200, i18n.__('favourites.addSuccess'));
};

const deleteFav = async (req, res, next) => {
    const { projectId, userId } = req.params;
    const response = await myListService.deleteProjectFromFav({ projectId, userId });

    if (response.affectedRows === 0)
        return responseError(res, 400, i18n.__('favourites.removeError'));

    return responseMessage(res, 200, i18n.__('favourites.removeSuccess'));
};

module.exports = {
    getFavs: catchedAsync(getFavs),
    postFav: catchedAsync(postFav),
    deleteFav: catchedAsync(deleteFav),
};