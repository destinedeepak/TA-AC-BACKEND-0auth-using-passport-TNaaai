var express = require('express');
const app = require('../app');
var router = express.Router();
var passport = require('passport');
const { session } = require('passport');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/success', (req, res, next) => {
  res.render('success');
});

router.get('/failure', (req, res, next) => {
  res.render('failure');
});

router.get('/auth/google', passport.authenticate('google', {scope:['email','profile']}));

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/failure' }),
  (req, res) => {
    console.log(req.user, "csvsvsvsvsvsvsv")
   res.redirect('/success');
  }
);

module.exports = router;
