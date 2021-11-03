'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Nodes', // name of Source model
      'RoomId', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Rooms', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    ).then(() => {
      return queryInterface.addColumn(
        'Rooms', // name of Source model
        'NodeId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Nodes', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
