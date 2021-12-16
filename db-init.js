require('dotenv').config()
const env = process.env.enviroment || 'development';
const { Client } = require('pg');
var spawn = require('child_process').spawn;
const config = require(__dirname + '/config/config')[env];
let options;

if (process.env.enviroment == "development_heroku") {
    options = {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    }
} else {
    options = {
        user: config.username,
        password: config.password,
        host: config.host,
        port: config.port,
    }
}

const client = new Client(options)

client
    .connect()
    .catch((err) => (console.error('Error Occured: ' + err)))

const migrate = (rowCount) => {
    const migrate = spawn("npx", ["sequelize-cli", "db:migrate"], { stdio: 'inherit', shell: true });
    migrate.on('exit', () => {
        if(rowCount < 1) spawn("npx", ["sequelize-cli", "db:seed:all"], { stdio: 'inherit', shell: true });
    })

}
if (process.env.enviroment == "development_heroku") {
    client.end();
    migrate(1);
} else {
        client
            .query(`SELECT 1 FROM pg_database WHERE datname = '${config.database}'`)
            .then(async (res) => {
                if(res.rowCount < 1) {
                    console.log('create database');
                    await client.query(`CREATE DATABASE ${config.database}`)
                }
                console.log('migrate');
                client.end()
                migrate(res.rowCount);
            }
            )
            .catch((err) => {
                console.log('Error Occured: ' + err);
                throw new Error(err);
                client.end();
            })
}