'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Change the `answerText` to allow null and update the type if necessary
    await queryInterface.changeColumn('Answers', 'answerText', {
      type: Sequelize.STRING,
      allowNull: true
    });

    // Add the `answerImageUrl` column to the table
    await queryInterface.addColumn('Answers', 'answerImageUrl', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.changeColumn('Answers', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: true, // Make userId nullable
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert changes by removing the `answerImageUrl` column
    await queryInterface.removeColumn('Answers', 'answerImageUrl');

    // Revert `answerText` back to its original state
    await queryInterface.changeColumn('Answers', 'answerText', {
      type: Sequelize.TEXT,
      allowNull: false
    });
    await queryInterface.changeColumn('Answers', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false, // Make userId not nullable
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    });
  }
};
