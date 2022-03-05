var express = require('express');
var router = express.Router();
const {userController} = require('../controllers/user')
const{ auth }= require('../middlewares/auth')
const User = require('../models/users')


/* GET users listing. */
router.put('/editBio/:id', auth.requireLogin, userController.EditBio)

router.get('/dashboard', auth.requireLogin, async(req, res)=>{
  try{
    const userid = req.session.userId
    const user = await User.findById(userid);
    res.status(200).render('dashboard', {
      username : user.Username,
      fullname : user.Fullname,
      userbio : user.Bio,
      joined : user.Joined

    });
  }
  catch(err){
    res.status(404).render('mainerr', {
      // error : err,
      message : "We couldn't get user"
    })
  }
  
})

module.exports = router;
