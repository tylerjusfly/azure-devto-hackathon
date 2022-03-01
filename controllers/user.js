const User = require('../models/users')

exports.userController ={
  EditBio : async(req, res) => {

      try{
        const user = await User.findById(req.params.id)
          .select('Fullname Username Bio Joined');
        user.Bio = req.body.Bio
        let result = await user.save()
        res.send(result)
      }
      catch(err){
        res.status(404).send({message : "There was an error Updating your Bio"})
      }
  
  }
}