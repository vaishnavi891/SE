const sequelize = require("../config/connection");
const userData = require("./userData.json");
const dayData = require("./dayData.json");
const scoreData = require("./scoreData.json");
const logData = require('./logData.json');

const { User, Day, Score, Log } = require("../models");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  await Day.bulkCreate(dayData);
  await Score.bulkCreate(scoreData);
  await Log.bulkCreate(logData)
  process.exit(0);
};

seedDatabase();
