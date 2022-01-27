const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const authDAO = require('../model/authDAO');
require('dotenv').config({ path: ".env"});

const GOOGLE_CLIENT_ID = process.env.GOOGLE_ID;
const GOOGLE_CLIENT_PW = process.env.GOOGLE_PW

module.exports = () => { 
    passport.use('google-login', new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_PW,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true
}, async(req, accessToken, refreshToken, profile, done)=>{
    try {           
        const user = await authDAO.passportCheckGoogle(profile);
        if (user){
            const insertuser = await authDAO.insertGoogleUser(profile);
            const newuser = await authDAO.passportCheckUser(profile);
            return done(null, newuser);
        }
        return done(null, user)
    } catch (error) {
        return done(null, false, { message: error })
    }
}))
}