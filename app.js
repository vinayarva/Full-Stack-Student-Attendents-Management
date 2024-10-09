const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const sequelize = require("./database/database");
const Attendance = require("./models/attendance");
const Student = require("./models/student_Model");
const routes = require("./Route/route");
const { FORCE } = require("sequelize/lib/index-hints");

const app = express();

app.use(cors());
app.use(bodyParser.json());

Student.hasMany(Attendance, { foreignKey: "studentId" });
Attendance.belongsTo(Student, { foreignKey: "studentId" });

app.use(routes);

sequelize
  .sync()
  .then(() => {
    app.listen(4000, () => {
      console.log("Server is running on http://localhost:4000/");
    });
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });
