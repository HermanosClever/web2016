import mongoose, { Schema } from 'mongoose';

var Module = new Schema({  
	tittle: String,
  paragraph: String,
  img: String
});

var usSchema = new Schema({
  token: String,
	tittle: String,
  paragraph: String,
  modules: [Module]
});

module.exports = mongoose.model('MODULE', Module);
module.exports = mongoose.model('US', usSchema);
