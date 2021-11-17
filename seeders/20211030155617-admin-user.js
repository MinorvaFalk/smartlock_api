'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const bcrypt = require('bcrypt');

    const salt = await bcrypt.genSalt(10);

    const password = await bcrypt.hash('rbsadmin', salt);

    return queryInterface.bulkInsert('Users', [{
      first_name: 'admin',
      last_name: 'RBS',
      email: 'admin@rbsumn.ac.id',
      nim: 1111111,
      uid: 'FFFFF',
      password: password,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
