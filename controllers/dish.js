const Dish = require('../models/dish')

exports.DishCtrl = {
  CreateDish : async (req, res, next) => {
    const {Dishname = req.body,Dishname, 
      Dishpics, Videolink, Dishdetails, } = req.body

    try{
      const Dishdata = new Dish({
        Dishowner,
        Dishname,
        Dishpics,
        Videolink,
        Dishdetails
      })
      await Dishdata.save();
      res.status(201).send(Dishdata)

    }
    catch(err){
      console.log(err)
      res.status(404).send(err.message)
    }

  }







}