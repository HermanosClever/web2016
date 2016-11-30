import mongoose from 'mongoose';
var Us = mongoose.model('US');
var Module = mongoose.model('MODULE');

// GET - Return us page info
exports.getUsInfo = function (req, res) { 

  Us.find(function (err, us) {
    if (err) {
      res.send(500, err.message);
    };
    console.log('GET /us');
    res.status(200).jsonp(us);
  });

};

exports.saveModule = function (req, res) {  
  console.log('POST -> MODULE');

  var module = new Module(req.body);
  console.log(module);
  console.log(req.params.id);


  Us.findOne({ '_id' : req.params.id }, function (err, us) {
    if (err) {
      return res.send(404);
    };
    us.modules.push(module);
    console.log(us);
  
    us.save(function (errSave) {
      if (errSave) {
        return res.send(404);

      };
      res.status(200).jsonp(us);
    });
  });
};

exports.deleteModule = function (req, res) {

  Us.findOne({ '_id' : req.params.id }, function (err, us) {
    if (err) {
      return res.send(404);
    }
    us.modules = us.modules.filter( modules => modules._id != req.body.id );
    us.save(function (errSave) {
      if (errSave) {
        return res.send(404);

      };
      res.status(200).jsonp(us);
    });
  });

};

exports.updateModule = function (req, res) {

  Us.findOne({ '_id' : req.params.id }, function (err, us) {
    if (err) {
      return res.send(404);
    }
    console.log('PUT -> updateModule');
    console.log(req.body);
    us.modules.map(module => {
      if(module._id == req.body.id) {
        module.tittle = req.body.tittle;
        module.img = req.body.img;
        module.paragraph = req.body.paragraph;
      }
    });
    us.save(function (errSave) {
      if (errSave) {
        return res.send(404);
      };
      res.status(200).jsonp(us);
    });
  })
}

exports.updateUs = function (req, res) {
  Us.findOne({ '_id' : req.params.id }, function (err, us) {
    if (err) {
      return res.send(404);
    }
    console.log('PUT -> updateModule');
    console.log(req.body);
    us.tittle = req.body.tittle;
    us.paragraph = req.body.paragraph;

    us.save(function (errSave) {
      if (errSave) {
        return res.send(404);
      };
      res.status(200).jsonp(us);
    });
  })
}

// Insert default HomeInfo
Us.findOne({ 'token': 'secret' }, function (err, info) {
  if (!info) {
    var usInfo = new Us({
    	token: 'secret',
		  tittle: 'Diseñamos buenas experiencias.',
		  paragraph: '<p>Esto es un parrafo</p>',
		  modules: [{
		    id: 'UI/UX Design',
		    tittle: 'UI/UX Design',
		    paragraph: 'asdasd',
		    img: 'https://daks2k3a4ib2z.cloudfront.net/56ab386e6204e5ff5f8b0e2e/570df92fa6123f7a3b4a5ccf_ui_ux_illustration.png'
		  }]
		});
    if (err) {
      console.log('contact not Inserted');
    };
    usInfo.save(function (errS, usRes) {
      if (errS) {
        console.log('usInfo not Inserted');
      };
    });
  }
});