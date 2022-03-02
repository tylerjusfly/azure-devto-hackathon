var express = require('express');
var router = express.Router();
const {userController} = require('../controllers/user')
const{ auth }= require('../middlewares/auth')


/* GET users listing. */
router.put('/editBio/:id', auth.requireLogin, userController.EditBio)

module.exports = router;
