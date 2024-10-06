const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const sequelize = require('./database/database');
const attendance = require("./models/model");



const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/attendance",(req,res,next)=>{
    const data =  req.body
    data.forEach(element => {
        attendance.create(element).then((result) => {
            console.log("successfully")
        }).catch((err) => {
            console.log(err)
        });
    });
    res.sendStatus(200)
})

app.post("/fetch",(req,res,next)=>{

    const arr = req.body
    const finalData = []
async function test(arr) {
    try{
        for (let i = 0; i < arr.length; i++) {
            await attendance
              .findAll({ where: arr[i] })
              .then((result) => {
                const length = result.length;
                const presentDays = NoOfDayPresent(result);
                const percentage = Math.floor((presentDays / length) * 100);
          
                const studentData = {
                  studentName: arr[i].studentName,
                //   totalDays: length,
                  presentDays: presentDays+"/"+length,
                  percentage: percentage,
                };
          
                finalData.push(studentData)
              })
              
          }

          res.json(finalData);

    }catch(err){
        console.log(err)
    }
    
      
}

function NoOfDayPresent(data) {
  let counter = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].attendance === true) {
      counter++;
    }
  }

  return counter;
}


test(arr) 

  
})

app.post("/",(req,res,next)=>{

    attendance.findAll({where:{
        date: req.body.date
    }}).then((result)=>{
            if(result.length > 0){
                return res.json(result)
            }else{
                return res.send(false)
            }
     }).catch(err => {
        console.log(err);
        return res.status(500)
    })
    
})




sequelize
    .sync({ force:false }) // Adjust force to true for development, false for production
    .then(() => {
        app.listen(4000, () => {
            console.log('Server is running on http://localhost:4000/');
        });
    })
    .catch((err) => {
        console.error('Error connecting to database:', err);
    });