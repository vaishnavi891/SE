const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Score extends Model {}

Day.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    q1_value: {
      type: DataTypes.INTEGER,
      allowNull: false,
      isUnique: false,
    },
    q2_value: {
      type: DataTypes.INTEGER,
      allowNull: false,
      isUnique: false,
    },
    q3_value: {
      type: DataTypes.INTEGER,
      allowNull: false,
      isUnique: false,
    },
    q4_value: {
      type: DataTypes.INTEGER,
      allowNull: false,
      isUnique: false,
    },
    day_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "day",
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

module.exports = Score;
