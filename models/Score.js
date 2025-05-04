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
    day_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "day",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    q1_value: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
    },
    q2_value: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
    },
    q3_value: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
    },
    q4_value: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
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
