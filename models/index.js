const User = require("./User");
const Calendar = require("./Calendar");
const Day = require("./Day");
const Score = require("./Score");

User.hasMany(Calendar, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Calendar.hasMany(Day, {
  foreignKey: "calendar_id",
  onDelete: "CASCADE",
});

Score.belongsTo(Day, {
  foreignKey: "day_id",
});

module.exports = { User };
