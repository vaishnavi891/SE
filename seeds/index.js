const sequelize = require("../config/connection");

const userData = require("./userData.json");
const calendarData = require("./calendarData.json");
const dayData = require("./dayData.json");
const scoreData = require("./scoreData.json");

const { User, Calendar, Day, Score } = require("../models");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await User.bulkCreate(userData, {
    individualHooks: true,
  });
  await Calendar.bulkCreate(calendarData);
  await Day.bulkCreate(dayData);
  await Score.bulkCreate(scoreData);
};

seedDatabase;
