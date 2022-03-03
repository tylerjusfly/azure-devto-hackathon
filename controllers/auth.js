const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/auth');


exports.authController = {
  signUp : async (req, res) => {
    const { Fullname, Username, Password, Cpassword } = req.body

    if (Password !== Cpassword ){
      res.status(400).send("Password does not match");
    }
    else{
    
    const NewPassword = bcrypt.hashSync(Password, 10)
    let dateJoined = new Date().toLocaleString('default', { month: 'long', year : 'numeric' })
    // dateJoined = (dateJoined.getUTCFullYear()) + "/" + (dateJoined.getMonth() + 1);
    try{
      const userdata = new User({
        Fullname,
        Username,
        Password : NewPassword,
        Joined : dateJoined
      })
      await userdata.save()
      res.status(201).redirect('/signin')
      }
    catch(err){
      console.log(err)
      res.status(404).send(err.message)
      }
  }
}, // End of SignUP Logic

// Session Login Logic
SignIn: (req, res) => {
  let {Username, Password} = req.body
  
  User.findOne({Username})
  .then(user => {
    // if user record does exist
    if(user){
      
      const isValidPass = bcrypt.compareSync(Password, user.Password)
      if(isValidPass){

        req.session.userId = user._id
        req.session.username = user.Username
        return res.redirect('/users/dashboard')

      }else{
        res.send({message : "password is not correct"})
      }
    }else{
      res.status(400).send({message : "user does not exist"})
    }
    
  })
  
  
}
// End of login logic

}
