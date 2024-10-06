const express = require("express");
const Controller = require("../Controller/controllers");

const routes = express.Router();

routes.post("/fetch", Controller.fetchReport);

routes.post("/attendance", Controller.postAttendance);

routes.post("/", Controller.dateSearch);

module.exports = routes;
