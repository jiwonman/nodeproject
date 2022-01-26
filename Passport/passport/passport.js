const passport = require('passport');
const db = require('../Config/dbConn');
const localLogin = require('./local-login');
const localSignup = require('./local-signup');

module.exports = () => {
    passport.serializeUser((user,done) => {
        done(null, user.user_id);
    })

    passport.deserializeUser((id, done) => {
        db.query(`SELECT user_id, name FROM User WHERE user_id =? `, [id], (err, user) => {
            done(err, user[0]);
        })
    })

    localLogin();
    localSignup();
}