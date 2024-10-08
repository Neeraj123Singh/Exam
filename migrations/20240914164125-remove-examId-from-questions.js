'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Questions', 'examId');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Questions', 'examId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Exams',
        key: 'id'
      },
      onDelete: 'CASCADE',
      allowNull: false
    });
  }
};
