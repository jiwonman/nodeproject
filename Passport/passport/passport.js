const passport = require('passport');
const localLogin = require('./local-login');
const localSignup = require('./local-signup');
const GoogleLogin = require('./google-login');
const FacebookLogin = require('./facebook-login');

module.exports = () => {
    passport.serializeUser((user,done) => {
        done(null, user);
    })

    passport.deserializeUser((id, done) => {
        done(null, id);
    })

    localLogin();
    localSignup();
    GoogleLogin();
    FacebookLogin();
}