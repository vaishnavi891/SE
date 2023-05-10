const { Model, DataTypes, Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class Medicine extends Model {}

Medicine.init(
  {
    medicine_input: {
      type: Sequelize.STRING,
      get() {
        const stringValue = this.getDataValue("medicine_input");
        return stringValue ? stringValue.split(",") : null;
      },
      set(value) {
        const arrayValue = value ? value.join(",") : "";
        this.setDataValue("medicine_input", arrayValue);
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "medicine",
  }
);

module.exports = Medicine;
