const sequelize = require("../config/connection");

const userData = require("./userData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
};

seedDatabase;
