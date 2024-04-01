function auth(req, res, next) {

    const token = req.headers['token'];

    if (!token) {
        return res.status(401).send({
            result: 'Error',
            mensaje: 'No existe token de acceso al sistema. Por favor, autentícate en el sistema.'
        });
    }
}

module.exports = {
    auth
};