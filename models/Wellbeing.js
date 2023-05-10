const { Model, DataTypes, Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class Wellbeing extends Model {}

Wellbeing.init(
  {
    wellbeing_input: {
      type: Sequelize.STRING,
      get() {
        const stringValue = this.getDataValue("wellbeingInfo");
        return stringValue ? rawValue.split(",") : null;
      },
      set(value) {
        const arrayValue = value ? value.join(",") : "";
        this.setDataValue("wellbeingInfo", arrayValue);
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "wellbeing",
  }
);

module.exports = Wellbeing;
