const express = require('express');
const router = express.Router();
const indexCtrl = require('../controller/indexCtrl');

/* GET home page. */
router.get('/', indexCtrl.indexRoot);

router.get('/products', indexCtrl.indexProduct);

router.get('/cart/:id', indexCtrl.indexCart)

router.get('/cart', indexCtrl.CartId);

module.exports = router;
