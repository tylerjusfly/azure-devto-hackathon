var express = require('express');
var router = express.Router();
const {authController} = require('../controllers/auth')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index')
  // res.send( "Welcome to Store API");
});
router.get('/signup', (req, res) =>{ res.render('signup')})
router.get('/signin', (req, res) =>{ res.render('signin')})

router.post('/signup', authController.signUp)

router.post('/signin', authController.SignIn)




module.exports = router;
