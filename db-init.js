const env = process.env.enviroment || 'development';
const { Client } = require('pg');
var spawn = require('child_process').spawn;
const config = require(__dirname + '/config/config.json')[env];
let options;

if(process.env.enviroment == "development_heroku"){   
    options = {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    }
} else {
    options = {
        user: config.username,
        password: config.password,
        database: config.database,
        host: config.host,
        port: config.port,
        ssl: { rejectUnauthorized: false }
    }   
}

const client = new Client(options)

client
    .connect()
    .catch((err) => (console.log('Error Occured: '+err)))

if(process.env.enviroment == "development_heroku"){
    client.end();
    const migrate = spawn("npx", ["sequelize-cli","db:migrate"], { stdio: 'inherit' , shell: true});
        migrate.on('exit', () => {
            spawn("npx", ["sequelize-cli","db:seed:all"], { stdio: 'inherit' , shell: true});
    })
} else {
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
}