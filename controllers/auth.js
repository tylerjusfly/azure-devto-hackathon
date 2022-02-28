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
      res.status(201).send(userdata)
      }
    catch(err){
      console.log(err)
      res.status(404).send(err.message)
      }
  }
}, // End of SignUP Logic

  /* Login Logic*/
  SignIn : async (req, res, next) => {
    const {Username, Password} = req.body

    const user = await User.findOne({Username})
    if (user){
      const validPassword = bcrypt.compareSync(Password, user.Password)
      if (validPassword){
        let payload = { id : user._id, Username : user.Username }

        // Generating Token
        let token = jwt.sign(payload, config.secretKey, {expiresIn : '1d'})

        res.status(200).send({
          AccessToken : token,
          User : user
        })
      }else{ res.status(404).send({message : 'username or password not valid'})}

    }else{ res.status(404).send({message : 'username or password not valid'})}
  }

}