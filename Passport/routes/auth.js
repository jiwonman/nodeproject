const express = require('express');
const passport = require('passport');
const router = express.Router();
const loginCtrl = require('../Controller/loginCtrl');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares/login-middlewares');

router.get('/login', loginCtrl.loginRoot);

router.get('/logout', isLoggedIn, loginCtrl.logout);

router.get('/welcome', loginCtrl.Welcome);

router.get('/register', loginCtrl.Register);

router.post('/login', isNotLoggedIn, passport.authenticate('local-login', {
    successRedirect: '/auth/welcome',
    failureRedirect : '/auth/login',
    failureFlash : true
}));

router.post('/register', isNotLoggedIn, passport.authenticate('local-signup', {
    successRedirect: '/auth/welcome',
    failureRedirect: '/auth/register',
    failureFlash: true
}));

router.get('/google', passport.authenticate('google-login', {
    scope : ["email", "profile"]
}));

router.get('/google/callback',  passport.authenticate('google-login',{
    successRedirect: '/auth/welcome',
    failureRedirect: '/auth/login',
    failureFlash: true
}));

router.get('/facebook', passport.authenticate('facebook-login', {
    scope : "email"
}));                             // 1번째 왕복

router.get('/facebook/callback', passport.authenticate('facebook-login', {                    // 2번째 왕복 , 타사 인증은 대체로 라우터가 2개
    successRedirect : '/auth/welcome',
    failureRedirect : '/auth/login'
}));

module.exports = router;