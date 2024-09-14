'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Questions', 'answer', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn('Questions', 'imageUrl', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Questions', 'options', {
      type: Sequelize.JSON,
      allowNull: true,
    });

    // You may need to adjust this if 'questionText' needs to change from TEXT to STRING
    await queryInterface.changeColumn('Questions', 'questionText', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Questions', 'answer');
    await queryInterface.removeColumn('Questions', 'imageUrl');
    await queryInterface.removeColumn('Questions', 'options');

    // Revert 'questionText' change if needed
    await queryInterface.changeColumn('Questions', 'questionText', {
      type: Sequelize.TEXT,
      allowNull: false,
    });
  }
};
