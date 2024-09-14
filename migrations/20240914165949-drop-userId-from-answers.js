'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Drop the `userId` column from the `Answers` table
    await queryInterface.removeColumn('Answers', 'userId');
  },

  down: async (queryInterface, Sequelize) => {
    // Re-add the `userId` column to the `Answers` table
    await queryInterface.addColumn('Answers', 'userId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE',
      allowNull: false // or true, depending on your requirement
    });
  }
};
