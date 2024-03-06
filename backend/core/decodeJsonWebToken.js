const config = require('config');
const jwt = require('jsonwebtoken');

function decodeJsonWebToken(signedData) {
    try {
        const decodedValue = jwt.verify(signedData, config.get("JSONWEBTOKEN"));
        return decodedValue;
    }
    catch (e) {
        throw e;
    }
}

module.exports = decodeJsonWebToken;
