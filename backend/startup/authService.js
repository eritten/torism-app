const auth = require("../routers/users/login");
const register = require("../routers/users/register");

function authService(app) {
    app.use("/auth", auth);
    app.use("/auth", register);
}

module.exports = {
    authService
};