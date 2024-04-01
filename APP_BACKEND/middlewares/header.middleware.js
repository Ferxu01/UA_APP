const allowCrossTokenOrigin = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    return next();
};
const allowCrossTokenMethods = (req, res, next) => {
    res.header('Access-Control-Allow-Methods', '*');
    return next();
};
const allowCrossTokenHeaders = (req, res, next) => {
    res.header('Access-Control-Allow-Headers', '*');
    return next();
};

module.exports = {
    allowCrossTokenOrigin,
    allowCrossTokenMethods,
    allowCrossTokenHeaders
};