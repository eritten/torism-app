const { Sequelize } = require('sequelize');

const userName = "root" || process.env.USERNAME;
const password = "GyauEritten1234" || process.env.PASSWORD;
const database = "torism_app" || process.env.DATABASE;

const sequelize = new Sequelize(userName, password, database, { host: "localhost", dialect: "mysql", logging: false });

sequelize.authenticate()
    .then(() => {
        console.log("database connection successful")
    })
    .catch((err) => {
        console.log(err);
    });

module.exports = sequelize;