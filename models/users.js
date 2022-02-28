const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  Fullname : {type : String, required : true, maxlength: 50},
  Username : {type : String, required : true, minlength: 5, maxlength: 50, unique: true },
  Password : {type : String, required : true, minlength : 8,},
  Bio : {type : String, default: ''},
  Joined : {type : String, }
})

const User = mongoose.model('User', UserSchema)

module.exports = User;