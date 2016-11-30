import mongoose, { Schema } from 'mongoose';

var listSchema = new Schema({
	tittle: String
})

var modulesSchema = new Schema({
	tittle: String,
	paragraph: String,
	img: String
})

var projectSchema = new Schema({  
  tittle: String,
  img: String,
  paragraph: String,
  lists: [listSchema],
  modules: [modulesSchema]
});

var projectStateSchema = new Schema({
	tittle: String,
	token: String,
	projects: [projectSchema]
});
 
module.exports = mongoose.model('LIST', listSchema);
module.exports = mongoose.model('MODULES', modulesSchema);
module.exports = mongoose.model('PROJECT', projectSchema);
module.exports = mongoose.model('PROJECTSTATE', projectStateSchema);
