const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const authDAO = require('../model/authDAO');
require('dotenv').config({ path: ".env"});

module.exports = () => { 
    passport.use('facebook-login', new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_PW,
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields : ['email', 'id', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified', 'displayName'],
    passReqToCallback: true
}, async(req, accessToken, refreshToken, profile, done)=>{
    console.log(profile._json);
    try {           
        const user = await authDAO.passportCheckFacebook(profile);
        console.log(user);
        if (user == 0){
            const insertuser = await authDAO.insertFacebookUser(profile);
            const newuser = await authDAO.passportCheckFacebook(profile);
            return done(null, newuser);
        }
            return done(null, user)
    } catch (error) {
        return done(null, false, { message: error })
    }
}))
}