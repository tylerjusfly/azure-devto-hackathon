const Dish = require('../models/dish')
const mongooseErrorHandler = require('mongoose-validation-error-message-handler');


exports.DishCtrl = {
  CreateDish : async (req, res, next) => {
    const {Dishname, Dishpics, Videolink, Dishdetails, } = req.body

    const dishNameToUpper = Dishname.toUpperCase()

    try{
      const Dishdata = new Dish({
        Dishowner : req.session.userId,
        Dishname : dishNameToUpper,
        Dishpics,
        Videolink,
        Dishdetails
      })
      await Dishdata.save();
      res.status(201).redirect('/dishes');
    }
    catch(err){
      const error = mongooseErrorHandler(err);
      res.status(404).render('mainerr', {message : error.message})
    }

  },
  // Get All dish
  Getall : async(req, res) => {
    try{
      const list_dishes = await Dish.find().populate('Dishowner', 'Fullname Username Bio');
      res.status(200).render('dish', { list_dishes : list_dishes})
    }
    catch(err){
      res.status(404).render('mainerr',{
        error : err,
        message : "We couldn't get all dishes"
      })
    }

  },

  Search : async(req, res) => {
    const search = req.body.search.toUpperCase();
    const queryStrings = search.split(" ")
    allQueries = []
    queryStrings.forEach(elem => {
      allQueries.push( {Dishname : {$regex : String(elem)} })
    })

    let dishes = await Dish.find( { $or : allQueries });
    if(!dishes || dishes.length === 0) res.status(404).render('mainerr', {message : "no dishes was found"})

    res.status(200).render('dish', {list_dishes : dishes});

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
      res.render('mainerr', {message : "error"})
    }

  }


}