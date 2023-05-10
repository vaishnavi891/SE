const User = require("./User");
const Day = require("./Day");
const Score = require("./Score");
const Log = require("./Log");
const Wellbeing = require("./Wellbeing");

User.hasMany(Day, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Day.hasOne(Score, {
  foreignKey: "day_id",
});

User.hasMany(Log, {
  foreignKey: "user_id",
});

User.hasOne(Wellbeing, {
  foreignKey: "user_id",
});

module.exports = { User, Day, Score, Log, Wellbeing };
