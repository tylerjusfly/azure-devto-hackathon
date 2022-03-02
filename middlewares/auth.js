exports.auth = {
  requireLogin : (req, res, next) => {
    if(req.session && req.session.userId){
      next()
    }
    else{
      res.status(404).send('not loggedin')
    }

}
}