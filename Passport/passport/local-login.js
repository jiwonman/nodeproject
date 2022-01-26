const passport = require('passport');
const LocalStrategy = require('passport-local');
const authDAO = require('../model/authDAO');
const bkfd = require('../middlewares/bkfd2');

module.exports = () => {
    passport.use('local-login', new LocalStrategy({
        usernameField : 'user_id',
        passwordField : 'user_pw'
    }, async (user_id, user_pw, done) => {
        try {
            const user = await authDAO.passportCheckUser(user_id)
            console.log(user)
            const result = await bkfd.decryption(user_pw, user.salt, user.user_pw);
            done(null, user)
        } catch (error) {
            done(null, false, { message : error })
        }
    }))
}