const { Model, DataTypes, Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class Wellbeing extends Model {}

Wellbeing.init(
  {
    wellbeing_input: {
      type: Sequelize.STRING,
      get() {
        const stringValue = this.getDataValue("wellbeing_input");
        return stringValue ? stringValue.split(",") : null;
      },
      set(value) {
        const arrayValue = value ? value.join(",") : "";
        this.setDataValue("wellbeing_input", arrayValue);
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
