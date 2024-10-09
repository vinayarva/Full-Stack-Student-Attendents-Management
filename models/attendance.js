const sequelize = require("../database/database");
const Sequelize = require("sequelize");

const Attendance = sequelize.define("attendances", {
  Id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },attendance:{
    type : Sequelize.BOOLEAN,
    allowNull : false
  }
},
  {
    timestamps: false,
}
);

module.exports = Attendance;
