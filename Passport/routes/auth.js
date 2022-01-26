const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const router = express.Router();
const loginCtrl = require('../Controller/loginCtrl');

router.get('/login', loginCtrl.loginRoot);

router.get('/logout', loginCtrl.logout);

router.get('/welcome', loginCtrl.Welcome);

router.get('/register', loginCtrl.Register);

router.post('/register', new FacebookStrategy({
    clientID : process.env.CLIENT_ID,
    clientSecret : process.env.APP_SECRET,
    callbackURL : "/auth/facebook/callback"
}, loginCtrl.Facebook));

router.post('/login', passport.authenticate('local', loginCtrl.loginAction));

router.get('/facebook', passport.authenticate('facebook'));                             // 1번째 왕복

router.get('/facebook/callback', passport.authenticate('facebook', {                    // 2번째 왕복 , 타사 인증은 대체로 라우터가 2개
    successRedirect : '/auth/welcome',
    failureRedirect : '/auth/login'
}));

passport.use(loginCtrl.Facebook);

passport.use(new LocalStrategy(loginCtrl.Passport));

passport.serializeUser(loginCtrl.serialize);

passport.deserializeUser(loginCtrl.deserialize);

module.exports = router;    