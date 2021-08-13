var express = require('express');
var router = express.Router();

var User = require('../model/User');



router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.redirect('/users/login');
});

module.exports = router;
