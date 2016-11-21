import mongoose, { Schema } from 'mongoose';
 
var usModelSchema = new Schema({  
	tittle : String,
  paragraph : String
});
 
module.exports = mongoose.model('USMODEL', usModelSchema);
