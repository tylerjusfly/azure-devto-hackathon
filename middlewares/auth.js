const jwt = require('jsonwebtoken')
const config = require('../config/auth')

validateToken = async (req, res, next) => {
  let token

  if (
     req.headers.authorization &&
     req.headers.authorization.startsWith('Bearer')
   ){
     // A try and catch block
     try{
       // The req header contains "Bearer <token>" so split it and use the second index
       token = req.headers.authorization.split(' ')[1]
   
       const user =  jwt.verify(token, config.secretKey)
       req.user = user
       
       return next()
     }
     catch(error){
       res.status(401).send({message : 'Not authorized, token failed'})
     }
  
   } // End of try and catch block
  
   if(token == null) res.status(401).send({message : "Token is not present"})
   
  }  // End of token Validation.


  


const jwtauth = {
  validateToken,
}

module.exports = jwtauth