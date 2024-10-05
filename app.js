const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const sequelize = require('./database/database');
const attendance = require("./models/model");


// const routes = require('./Route/routes'); // Assuming routes are in a separate file

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

app.post("/",(req,res,next)=>{

    attendance.findAll({where:{
        date: req.body.date
    }}).then((result)=>{
        if(result.length > 0){
            return res.send(true)
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