const { studiesService } = require('../services');
const catchedAsync = require('../utils/catchedAsync');
const responseError = require('../utils/messages/responseError');
const responseMessage = require('../utils/messages/responseMessage');

const i18n = require('../config/i18n');

const getDegrees = async (req, res, next) => {
    const degrees = await studiesService.getAllDegrees();

    if (degrees.length === 0)
        return responseError(res, 400, i18n.__('studies.degreeNotAvailable'));

    return responseMessage(res, 200, degrees);
};

const getDegree = async (req, res, next) => {
    const id = req.params['id'];
    const degree = await studiesService.getOneDegree(id);

    if (!degree)
        return responseError(res, 400, i18n.__('studies.degreeNotFound'));

    return responseMessage(res, 200, degree);
};

const getMasters = async (req, res, next) => {
    const masters = await studiesService.getAllMasters();

    if (masters.length === 0)
        return responseError(res, 400, i18n.__('studies.masterNotAvailable'));

    return responseMessage(res, 200, masters);
};

const getMaster = async (req, res, next) => {
    const id = req.params['id'];
    const master = await studiesService.getOneMaster(id);

    if (!master)
        return responseError(res, 400, i18n.__('studies.masterNotFound'));

    return responseMessage(res, 200, master);
};

module.exports = {
    getDegrees: catchedAsync(getDegrees),
    getDegree: catchedAsync(getDegree),
    getMasters: catchedAsync(getMasters),
    getMaster: catchedAsync(getMaster),
};