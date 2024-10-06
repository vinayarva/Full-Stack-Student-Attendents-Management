const attendance = require("../models/model");

exports.fetchReport = (req, res, next) => {
  const data = req.body;
  test(data)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => console.log(err));
};

exports.postAttendance = (req, res, next) => {
  const data = req.body;
  data.forEach((element) => {
    attendance
      .create(element)
      .then((result) => {
        console.log("successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  });
  res.sendStatus(200);
};

exports.dateSearch = (req, res, next) => {
  attendance
    .findAll({
      where: {
        date: req.body.date,
      },
    })
    .then((result) => {
      if (result.length > 0) {
        return res.json(result);
      } else {
        return res.send(false);
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500);
    });
};

//function for the dates count

function NoOfDayPresent(data) {
  let counter = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].attendance === true) {
      counter++;
    }
  }

  return counter;
}

//async function for the report making
async function test(data) {
  try {
    const finalData = [];
    for (let i = 0; i < data.length; i++) {
      const result = await attendance.findAll({ where: data[i] });
      const length = result.length;
      const presentDays = NoOfDayPresent(result);
      const percentage = Math.floor((presentDays / length) * 100);

      const studentData = {
        studentName: data[i].studentName,
        presentDays: `${presentDays}/${length}`,
        percentage: percentage,
      };

      finalData.push(studentData);
    }

    return finalData;
  } catch (err) {
    console.log(err);
  }
}
