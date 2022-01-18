const express = require('express');
const router = express.Router();
const indexCtrl = require('../Controller/indexCtrl');

/* GET home page. */
router.get('/', indexCtrl.indexRoot);

module.exports = router;
