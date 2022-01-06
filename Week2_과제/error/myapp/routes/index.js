var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/next', (req, res, next) => {
  res.render('next', { title: 'Second Express' });
});

module.exports = router;
