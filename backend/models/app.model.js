const databaseConnection = require('../startup/database_config');
const { Sequelize, DataTypes } = require('sequelize');

const User = databaseConnection.define("user", { email: { type: DataTypes.STRING, allowNull: false }, password: { type: DataTypes.STRING, allowNull: false }, userType: { type: DataTypes.ENUM, allowNull: false, values: ["hotel", "torist", "torist guides"] }, image: { type: DataTypes.STRING, allowNull: true } });

module.exports = {
    User
};