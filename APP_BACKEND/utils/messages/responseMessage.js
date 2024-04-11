module.exports = (res, status, message) => {
    res.status(status).json({
        status,
        response: message
    });
};