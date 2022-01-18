const session = require('express-session');
require('dotenv').config({ path : ".env" });

const SessionOption = {
    secret : process.env.secret,
    resave : process.env.RESAVE,
    saveUninitialized : process.env.SAVEUNINITIALIZED
}

const Session = session(SessionOption);

module.exports = Session;