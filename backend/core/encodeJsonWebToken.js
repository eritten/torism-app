const config = require('config');
const jwt = require('jsonwebtoken');

function encodeJsonWebToken(payLoad) {
    try {
        const encodedValue = jwt.sign(payLoad, config.get("JSONWEBTOKEN"));
        return encodedValue;
    }
    catch (e) {
        throw e;
    }
}

module.exports = encodeJsonWebToken;
