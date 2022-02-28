const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DishSchema = new Schema({
  Dishname : {type : String, required : true, maxlength: 100},
  Dishpics : {type : String, required : true },
  Videolink : {type : String, required : true},
  Dishdetails: {type : String, required: true},
  Dishowner : { type : mongoose.Schema.Types.ObjectId, ref: 'User'}
})

const Dish = mongoose.model('Dish', DishSchema)

module.exports = Dish;