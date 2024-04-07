const databaseConnection = require('../startup/database_config');
const { Sequelize, DataTypes } = require('sequelize');
const Hotel = require("./Hotel.model");

const User = databaseConnection.define("user", { email: { type: DataTypes.STRING, allowNull: false }, password: { type: DataTypes.STRING, allowNull: false }, userType: { type: DataTypes.ENUM, allowNull: false, values: ["hotel", "torist", "torist guides"] }, image: { type: DataTypes.STRING, allowNull: true }, isVerified: { type: DataTypes.BOOLEAN, defaultValue: false }, verificationCode: { type: DataTypes.STRING, allowNull: true } });
// one to many relationship with the hotel table
User.hasMany(Hotel);

module.exports = User;