import mongoose from 'mongoose';

var ProjectState = mongoose.model('PROJECTSTATE');
var Project = mongoose.model('PROJECT');

// GET - Return all projects in the DB
exports.getProjects = function (req, res) { 

  ProjectState.find(function (err, projects) {
    if (err) {
      res.send(500, err.message);
    };
    console.log('GET /projectState');
    res.status(200).jsonp(projects);
  });

};

exports.addProject = function (req, res) {

  var newProject = new Project(req.body);

  ProjectState.findOne({ '_id': req.params.id }, function (err, projectInfo) {
    projectInfo.projects.push(newProject);

    projectInfo.save(function (errSave) {
      if (errSave) {
        return res.send(404);

      };
      res.status(200).jsonp(projectInfo);
    });

  });

}

// Insertar el estado de Project por defecto 
ProjectState.findOne({ 'token': 'secret' }, function (err, info) {
  if (!info) {
    var projectState = new ProjectState({
      token: 'secret',
		  tittle: 'Diseños simples, objetivos cumplidos.',
		  projects: [{
        tittle: 'Correos',
        img: 'https://daks2k3a4ib2z.cloudfront.net/56ab386e6204e5ff5f8b0e2e/570536ec26fbd26467871cce_tarjeta_correos.jpg',
        paragraph: 'La misión era clara, Correos tenía un nuevo producto, una tarjeta prepago dirigida a todos los públicos y nos pidió que diseñáramos el escaparate web y la experiencia de usuario y visual de su aplicación móvil.',
        lists: [{
          tittle:'Experiencia de usuarios'
        }, {
          tittle: 'Diseño de app'
        }],
        modules: [{
          tittle: 'Modulo',
          paragraph: 'asdasd',
          img: ''
        }]
      }, {
        tittle: 'Zeleb',
        img: 'https://daks2k3a4ib2z.cloudfront.net/56ab386e6204e5ff5f8b0e2e/570536ec26fbd26467871cce_tarjeta_correos.jpg',
        paragraph: 'La misión era clara, Correos tenía un nuevo producto, una tarjeta prepago dirigida a todos los públicos y nos pidió que diseñáramos el escaparate web y la experiencia de usuario y visual de su aplicación móvil.',
        lists: [{
          tittle:'Experiencia de usuarios'
        }, {
          tittle: 'Diseño de app'
        }],
        modules: [{
          tittle: 'Modulo',
          paragraph: 'asdasd',
          img: ''
        }]
      }]
    });

    if (err) {
      console.log('Project State not Inserted');
    };
    projectState.save(function (errS, contactRes) {
      if (errS) {
        console.log('Project State Inserted');
      };
    });
  }
});