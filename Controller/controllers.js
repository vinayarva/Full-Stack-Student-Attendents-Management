const Student = require("../models/student_Model");
const Attendance = require("../models/attendance");

module.exports.dateSearch = (req, res, next) => {
  Attendance.findOne({ where: req.body })
    .then((result) => {
      if (result === null) {
        Student.findAll()
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        res.send(false);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.dayAttendance = (req, res, next) => {
  Attendance.findAll({ where: req.body, include: Student })
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.Report = (req, res, next) => {
  Student.findAll({ include: Attendance })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.postAttendances = (req, res, next) => {
  Attendance.bulkCreate(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.getStudents = (req, res, next) => {
  Student.findAll()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.postStudent = (req, res, next) => {
  Student.create(req.body)
    .then((result) => {
      console.log("data Created");

      return Student.findAll();
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
