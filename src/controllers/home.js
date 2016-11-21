import mongoose from 'mongoose';

var Home = mongoose.model('HOME');

// GET - Return home info in the DB
exports.getHomeInfo = function (req, res) { 

  Home.find(function (err, home) {
    if (err) {
      res.send(500, err.message);
    };
    console.log('GET /home');
    res.status(200).jsonp(home);
  });

};

// PUT - Update a register already exists
exports.updateHome = function (req, res) {  
  Home.findOne({ 'token': 'secret' }, function (err, home) {
    if (err) {
      return res.status(500).send(errSave.message);
    };
    home.tittle = req.body.tittle;
    home.description = req.body.description;
    home.slider1 = req.body.slider1;
    home.slider2 = req.body.slider2;
    home.slider3 = req.body.slider3;
    home.slider4 = req.body.slider4;
   
    home.save(function (errSave) {
      if (errSave) {
        return res.status(500).send(errSave.message);
      };
      console.log('PUT /home');
      res.status(200).jsonp(home);
    });
  });
};

// Insert default HomeInfo
Home.findOne({ 'token': 'secret' }, function (err, info) {
  if (!info) {
    var contact = new Home({
      token : 'secret',
		  tittle : 'Diseños simples, objetivos cumplidos.',
		  description : 'Slider1',
		  slider1 : 'Slider1',
		  slider2 : 'Slider2',
		  slider3 : 'Slider3',
		  slider4 : 'Slider4'
    });
    if (err) {
      console.log('contact not Inserted');
    };
    contact.save(function (errS, contactRes) {
      if (errS) {
        console.log('contact not Inserted');
      };
    });
  }
});