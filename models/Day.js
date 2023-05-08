const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Day extends Model {}

Day.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    day_name: {
      type: DataTypes.STRING,
      allowNull: false,
      isUnique: false,
    },
    day_of_the_month: {
      type: DataTypes.INTEGER,
      allowNull: false,
      isUnique: false,
    },
    calender_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "calendar",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "day",
  }
);

module.exports = Day;
