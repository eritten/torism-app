const databaseConnection = require('../startup/database_config');
const { Sequelize, DataTypes } = require('sequelize');

const Hotel = databaseConnection.define("hotel", { name: DataTypes.STRING, description: DataTypes.STRING, region: DataTypes.STRING, city: DataTypes.STRING, log: DataTypes.STRING, lat: DataTypes.STRING, star: DataTypes.INTEGER, shortUrl: DataTypes.STRING });


module.exports = Hotel;