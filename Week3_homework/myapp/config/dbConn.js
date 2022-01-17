const mysql = require('mysql');
require('dotenv').config({ path : ".env" });

const dbOption = {
    host : process.env.HOST,
    user : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE
}

const db = mysql.createConnection(dbOption);

module.exports = db;