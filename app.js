const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const sequelize = require("./database/database");
const Routes = require("./Route/routes");



const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(Routes);

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(4000, () => {
      console.log("Server is running on http://localhost:4000/");
    });
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });
