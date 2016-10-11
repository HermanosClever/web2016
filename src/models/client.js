import mongoose, { Schema } from 'mongoose';
 
var clientSchema = new Schema({  
  name : String,
  projects : [{ 
    name : String,
    description : String,
    UpdatedDate : Date,
    contacts : [{
      name : String,
      surname: String,
      email : String,
      phone : String,
      password : String
    }],
    milestone : [{
      title : String,
      description: String,
      state : Number,
      date : Date,
      links : [String]
    }],
  }],
});
 
module.exports = mongoose.model('CLIENT', clientSchema);  

