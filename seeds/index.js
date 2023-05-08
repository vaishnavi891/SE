const sequelize = require("../config/connection");
const User = require('../models/User')
const userData = require("./userData.json");
const calendarData = require("./calendarData.json");
const dayData = require("./dayData.json");
const scoreData = require("./scoreData.json");

const { User, Calendar, Day, Score } = require("../models");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  await Calendar.bulkCreate(calendarData);
  await Day.bulkCreate(dayData);
  await Score.bulkCreate(scoreData);
  process.exit(0);

};

seedDatabase();
