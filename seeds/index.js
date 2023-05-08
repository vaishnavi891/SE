const sequelize = require("../config/connection");

const userData = require("./userData.json");
const calendarData = require("./calendarData.json");
const dayData = require("./dayData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
};

seedDatabase;
