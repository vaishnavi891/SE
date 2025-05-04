'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('score', 'day_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'day',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('score', 'day_id');
  }
};
