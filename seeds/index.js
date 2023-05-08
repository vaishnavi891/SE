const sequelize = require("../config/connection");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
};

seedDatabase;
