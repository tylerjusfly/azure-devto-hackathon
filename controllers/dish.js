const Dish = require('../models/dish')

exports.DishCtrl = {
  CreateDish : async (req, res, next) => {
    const {Dishname, Dishpics, Videolink, Dishdetails, } = req.body

    try{
      const Dishdata = new Dish({
        Dishowner : req.user.id,
        Dishname,
        Dishpics,
        Videolink,
        Dishdetails
      })
      await Dishdata.save();
      res.status(201).send(Dishdata);
    }
    catch(err){
      console.log(err)
      res.status(404).send(err.message)
    }

  },
  // Get All dish
  Getall : async(req, res) => {
    try{
      const list_dishes = await Dish.find().populate('Dishowner', 'Fullname Username Bio');
      res.status(200).send(list_dishes)
    }
    catch(err){
      console.log(err)
      res.status(404).send({
        error : err,
        message : "We couldn't get all dishes"
      })
    }

  },

  Delete : async(req, res, next) => {
    try{
      const dish = await Dish.findByIdAndDelete(req.params.id)
      res.send({
        dish : dish,
        message : "the dish has been deleted"
      })
    }
    catch(err){
      res.send("error")
    }

  }







}