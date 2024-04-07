const login = require("../routers/users/login");
const register = require("../routers/users/register");
const changePassword = require("../routers/users/changePassword");
const changeEmail = require("../routers/users/changeEmail");
const reset = require("../routers/users/resetPassword");
const verifyCode = require("../routers/users/verifyCode")
const generateResetCode = require("../routers/users/generateResetCode");

function authService(app) {
    app.use("/users", login);
    app.use("/users", register);
    app.use("/users", changeEmail);
    app.use("/users", changePassword);
    app.use("/users", reset);
    app.use("/users", verifyCode);
    app.use("/users", generateResetCode);

}


module.exports = {
    authService
};