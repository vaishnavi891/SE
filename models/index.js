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

Day.hasOne(Score, {
  foreignKey: "day_id",
});

module.exports = { User, Calendar, Day, Score };
