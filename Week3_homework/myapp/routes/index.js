var express = require('express');
var router = express.Router();
const indexCtrl = require('../controller/indexCtrl');

/* GET home page. */
router.get('/', indexCtrl.indexRoot);

router.post('/', indexCtrl.indexData);

module.exports = router;
