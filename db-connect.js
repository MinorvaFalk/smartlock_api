require('dotenv').config();

const mongoose = require('mongoose');
const Sequelize = require('sequelize');

const env = process.env.enviroment || 'development';
const config = require(__dirname + '/config/config')[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

sequelize
  .authenticate()
  .then(res => console.log('Postgres Connected'))
  .catch(err => { throw new Error(err) })

mongoose
    .connect(process.env.MONGODB_URI)
    .then(res => console.log('db-connected'))
    .catch(err => { throw new Error(err) });

