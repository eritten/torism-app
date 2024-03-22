const auth = require("../routers/auth");
const register = require("../routers/register");

function authService(app) {
    app.use("/auth", auth);
    app.use("/auth", register);
}

module.exports = {
    authService
};