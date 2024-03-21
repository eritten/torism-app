const { Sequelize } = require('sequelize');

const userName = "root" || process.env.USERNAME;
cconst password = "GyauEritten1234" || process.env.PASSWORD;
const database = "torism_app" || process.env.DATABASE;

const sequelize = new Sequelize(database, userName, password, { host: "localhost", dialect: "mysql", logging: false });

sequelize.authenticate()
    .then(() => {
        console.log("database connection successful")
    })
    .catch((err) => {
        console.log(err);
    });

module.exports = sequelize;