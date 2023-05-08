const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Day extends Model { }

Day.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        q1: {
            type: DataTypes.INTEGER,
            allowNull: false,
            isUnique: false,
        },
        q2: {
            type: DataTypes.INTEGER,
            allowNull: false,
            isUnique: false,
        },
        q3: {
            type: DataTypes.INTEGER,
            allowNull: false,
            isUnique: false,
        },
        q4: {
            type: DataTypes.INTEGER,
            allowNull: false,
            isUnique: false,
        },
        day_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'day',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'day',
    }
);

module.exports = Day;
