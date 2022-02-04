const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const authDAO = require('../model/authDAO');
require('dotenv').config({ path: ".env"});

module.exports = () => { 
    passport.use('google-login', new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_PW,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true
}, async(req, accessToken, refreshToken, profile, done)=>{
    try {           
        const user = await authDAO.passportCheckGoogle(profile);
        console.log(user);
        if (user == 0){
            const insertuser = await authDAO.insertGoogleUser(profile);
            const newuser = await authDAO.passportCheckGoogle(profile);
            return done(null, newuser);
        }
            return done(null, user)
    } catch (error) {
        return done(null, false, { message: error })
    }
}))
}