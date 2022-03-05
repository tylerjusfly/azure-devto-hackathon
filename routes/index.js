var express = require('express');
var router = express.Router();
const {authController} = require('../controllers/auth')

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session && req.session.userId){
    res.redirect('/users/dashboard')
  }
  else{
    
    res.render('index')
  }
});
router.get('/signup', (req, res) =>{ res.render('signup')})
router.get('/signin', (req, res) =>{ res.render('signin')})

router.post('/signup', authController.signUp)

router.post('/signin', authController.SignIn)




module.exports = router;
