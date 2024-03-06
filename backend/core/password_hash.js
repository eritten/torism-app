const bcrypt = require('bcryptjs');

function hashPassword(password) {
    const genpassword = bcrypt.genSaltSync();
    const passwordHash = bcrypt.hash(password, genpassword);
    return passwordHash;
}

module.exports = hashPassword;