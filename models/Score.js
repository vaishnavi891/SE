const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Score extends Model {}

Score.init(
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
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "score",
  }
);

module.exports = Score;
