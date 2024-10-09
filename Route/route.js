const express = require("express");
const Controller = require("../Controller/controllers");

const route = express.Router();

route.post("/students",Controller.postStudent);

route.get("/students",Controller.getStudents);

route.post("/dateSearch", Controller.dateSearch);

route.post("/attendance",Controller.postAttendances );


route.post("/DayAttendance",Controller.dayAttendance)


route.get("/fetchReport",Controller.Report)

module.exports = route;
