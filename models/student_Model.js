const sequelize = require("../database/database");
const Sequelize = require("sequelize");

const Student = sequelize.define("students", {
  Id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  studentName: {
    type: Sequelize.STRING,
    allowNull: false,
  }},
  {
    timestamps: false,
}
);

module.exports = Student;
