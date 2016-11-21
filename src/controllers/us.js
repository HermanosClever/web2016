import mongoose from 'mongoose';
var Us = mongoose.model('USMODEL');

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
