const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Log extends Model { }

Log.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            isUnique: false,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
            isUnique: false,
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "log",
    }
);

module.exports = Log;
