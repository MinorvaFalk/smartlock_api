const env = process.env.enviroment || 'development';
const config = require(__dirname + '/config/config.json')[env];
const { Client } = require('pg');
var spawn = require('child_process').spawn;

const client = new Client(config)

client
    .connect()
    .catch((err) => (console.log('Error Occured: '+err)))

client
    .query(`CREATE DATABASE ${config.database}`)
    .then(() => {
        console.log('db created');
        client.end()
        const migrate = spawn("npx", ["sequelize-cli","db:migrate"], { stdio: 'inherit' , shell: true});
        migrate.on('exit', () => {
            spawn("npx", ["sequelize-cli","db:seed:all"], { stdio: 'inherit' , shell: true});
        })
    }
    )
    .catch((err) => {
        console.log('Error Occured: '+err);
        client.end();
    })