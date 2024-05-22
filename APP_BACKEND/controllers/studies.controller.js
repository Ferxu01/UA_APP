const { studiesService } = require('../services');
const catchedAsync = require('../utils/catchedAsync');
const responseError = require('../utils/messages/responseError');
const responseMessage = require('../utils/messages/responseMessage');

const getDegrees = async (req, res, next) => {
    const degrees = await studiesService.getAllDegrees();

    if (degrees.length === 0)
        return responseError(res, 400, 'Actualmente no disponemos de categorías de grados');

    return responseMessage(res, 200, degrees);
};

const getDegree = async (req, res, next) => {
    const id = req.params['id'];
    const degree = await studiesService.getOneDegree(id);

    if (!degree)
        return responseError(res, 400, 'No se ha encontrado el grado');

    return responseMessage(res, 200, degree);
};

const getMasters = async (req, res, next) => {
    const masters = await studiesService.getAllMasters();

    if (masters.length === 0)
        return responseError(res, 400, 'Actualmente no disponemos de categorías de másteres');

    return responseMessage(res, 200, masters);
};

const getMaster = async (req, res, next) => {
    const id = req.params['id'];
    const master = await studiesService.getOneMaster(id);

    if (!master)
        return responseError(res, 400, 'No se ha encontrado el máster');

    return responseMessage(res, 200, master);
};

module.exports = {
    getDegrees: catchedAsync(getDegrees),
    getDegree: catchedAsync(getDegree),
    getMasters: catchedAsync(getMasters),
    getMaster: catchedAsync(getMaster),
};