var express = require('express');
var router = express.Router();

/* GET dashboard. */
router.get('/', function(req, res, next) {
  res.render('dashboard', { title: 'MyCadence' });
});

module.exports = router;
