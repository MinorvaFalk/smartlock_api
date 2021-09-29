const env = process.env.enviroment || 'development';
const config = require(__dirname + '/config/config.json')[env];
const { Client } = require('pg');
var spawn = require('child_process').spawn;

const client = new Client({
    user: config.username,
    password: config.password,
    host: config.host,
    port: config.port,
})

client
    .connect()
    .catch((err) => (console.log('Error Occured: '+err)))

client
    .query(`CREATE DATABASE ${config.database}`)
    .then(() => {
        console.log('db created');
        client.end()
        spawn("npx", ["sequelize-cli","db:migrate"], { stdio: 'inherit' , shell: true});
    }
    )
    .catch((err) => {
        console.log('Error Occured: '+err);
        client.end();
    })