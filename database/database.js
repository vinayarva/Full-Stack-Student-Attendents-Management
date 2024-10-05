const Sequelize = require("sequelize");

const sequelize = new Sequelize("Database Name", "root", "password", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;

//test function for

// async function test() {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//       } catch (error) {
//         console.error('Unable to connect to the database:', error);
//       }
// }

// test()
