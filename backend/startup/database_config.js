const { Sequelize } = require('sequelize');

const userName = "root" || process.env.USERNAME;
const password = "GyauEritten1234" || process.env.PASSWORD;
const database = "torism_app" || process.env.DATABASE;

const sequelize = new Sequelize(database, userName, password, { host: "localhost", dialect: "mysql", logging: false });

sequelize.authenticate()
    .then(() => {
        console.log("database connection successful")
    })
    .catch((err) => {
        console.log(err);
    });
sequelize.sync()
    .then((res) => console.log("success"))
    .catch((e) => console.log(e));


module.exports = sequelize;