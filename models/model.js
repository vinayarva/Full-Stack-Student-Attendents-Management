const sequelize = require("../database/database");
const Sequelize = require("sequelize");

const attendance = sequelize.define("attendances", {
    ID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },date: {
    type: Sequelize.DATEONLY,
    allowNull: false },
  studentName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  attendance: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

module.exports = attendance;
