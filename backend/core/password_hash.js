const bcrypt = require('bcryptjs');

async function hashPassword(password) {
    const genpassword = bcrypt.genSaltSync();
    const passwordHash = await bcrypt.hash(password, genpassword);
    return passwordHash;
}

module.exports = hashPassword;