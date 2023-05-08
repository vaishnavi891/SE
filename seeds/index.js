const sequelize = require("../config/connection");
const User = require('../models/User')
const userData = require("./userData.json");
const calendarData = require("./calendarData.json");
const dayData = require("./dayData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  
  process.exit(0);
};

seedDatabase();
