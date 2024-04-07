const { authService } = require("./startup/authService");
const express = require("express");
require("./startup/database_config");

const app = express();
app.use(express.json());

authService(app);
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`running on port ${port}`);
});

module.exports = app;