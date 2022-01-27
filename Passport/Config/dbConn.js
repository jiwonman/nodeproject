const mysql = require('mysql');
require('dotenv').config({ path : '.env' });

const db = mysql.createPool({
    host : process.env.HOST,
    port : process.env.DB_PORT,
    user : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE,
    dateStrings : true
})

handleDisconnect(db)

function handleDisconnect (client) {
    client.on('error', (error) => {
        if(!error.fatal) return;
        if(error.code !== 'PROTOCOL_CONNECTION_LOST') throw err;
        console.error('> Re-connecting lost MYSQL connection ' + error.stack);
        db = mysql.createConnection(client.config);
        handleDisconnect(db);
        db.connect();
    });
};

module.exports = db;