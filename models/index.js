const User = require("./User");
const Day = require("./Day");
const Score = require("./Score");
const Log = require("./Log");
const Wellbeing = require("./Wellbeing");
const Medicine = require("./Medicine");
const Post = require("./Post");
const Comment = require("./Comment");

User.hasMany(Day, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Day.hasOne(Score, {
  foreignKey: "day_id",
});
Score.belongsTo(Day, {
  foreignKey: "day_id",
});


User.hasMany(Log, {
  foreignKey: "user_id",
});

User.hasOne(Wellbeing, {
  foreignKey: "user_id",
});

User.hasOne(Medicine, {
  foreignKey: "user_id",
});

User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

module.exports = { User, Day, Score, Log, Wellbeing, Medicine, Post, Comment };
