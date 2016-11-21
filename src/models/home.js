import mongoose, { Schema } from 'mongoose';
 
var homeSchema = new Schema({  
	token : String,
  tittle : String,
  description : String,
  slider1 : String,
  slider2 : String,
  slider3 : String,
  slider4 : String
});
 
module.exports = mongoose.model('HOME', homeSchema);  
