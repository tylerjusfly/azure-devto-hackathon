var express = require('express');
var router = express.Router();
const {authController} = require('../controllers/auth')
const {DishCtrl} = require('../controllers/dish')
const {verifyToken} = require('../middlewares/auth')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send( "Welcome to Store API");
});

router.post('/signup', authController.signUp)

router.post('/signin', authController.SignIn)

router.post('/dish', verifyToken,  DishCtrl.CreateDish)


module.exports = router;
