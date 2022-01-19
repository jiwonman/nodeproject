const express = require('express');
const router = express.Router();
const loginCtrl = require('../Controller/loginCtrl');

router.get('/login', loginCtrl.loginRoot);

router.post('/login', loginCtrl.loginAction);

router.get('/logout', loginCtrl.logout);

router.get('/welcome', loginCtrl.Welcome);

router.get('/register', loginCtrl.Register);

router.post('/register', loginCtrl.RegisterAction);

module.exports = router;    