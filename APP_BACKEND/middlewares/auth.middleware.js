const responseError = require('../utils/messages/responseError');
const i18n = require('../config/i18n');

function auth(req, res, next) {
    const token = req.headers['token'];

    if (!token)
        return responseError(res, 401, i18n.__('token.notExists'));

    const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidV4Regex.test(token))
        return responseError(res, 401, i18n.__('token.invalid'));

    next();    
}

module.exports = {
    auth
};