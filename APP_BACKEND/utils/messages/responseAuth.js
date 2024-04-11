module.exports = (res, status, token, data) => {
    res.status(status).json({
        status,
        token,
        response: data
    });
};