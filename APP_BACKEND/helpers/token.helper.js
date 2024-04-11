const crypto = require('crypto');

const generaToken = () => {
    return crypto.randomUUID();
}

module.exports = {
    generaToken
};