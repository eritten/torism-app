const crypto = require('crypto');

function generateRandomCode(length) {
    // Generate random bytes
    const buffer = crypto.randomBytes(length);

    // Convert random bytes to a hex string
    const hexString = buffer.toString('hex');

    // Convert hex string to number string
    const numberString = parseInt(hexString, 16).toString();

    // Return number string of specified length
    return numberString.slice(0, length);
}


module.exports = generateRandomCode;
