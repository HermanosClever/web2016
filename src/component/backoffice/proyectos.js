import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';
import Snackbar from 'react-toolbox/lib/snackbar';
import AgregarProyecto from './agregar-proyecto';
import { List, ListItem, ListSubHeader } from 'react-toolbox/lib/list';

export class Proyectos extends Component {
  constructor(props) {
    super(props);
    this.saveProject = this.saveProject.bind(this);
    this.updateProjectFunc = this.updateProjectFunc.bind(this);
    this.state = {
      tittle : '',
      projects: [{
        id: 'Correos',
        tittle: 'Correos',
        img: 'https://daks2k3a4ib2z.cloudfront.net/56ab386e6204e5ff5f8b0e2e/570536ec26fbd26467871cce_tarjeta_correos.jpg',
        paragraph: 'La misión era clara, Correos tenía un nuevo producto, una tarjeta prepago dirigida a todos los públicos y nos pidió que diseñáramos el escaparate web y la experiencia de usuario y visual de su aplicación móvil.',
        lists: [{
          id: 'Experiencia de usuarios',
          tittle:'Experiencia de usuarios'
        }, {
          id: 'Diseño de app',
          tittle: 'Diseño de app',
        }],
        modules: [{
          tittle: 'Modulo',
          paragraph: 'asdasd',
          img: ''
        }]
      }, {
        id: 'Zeleb',
        tittle: 'Zeleb',
        img: 'https://daks2k3a4ib2z.cloudfront.net/56ab386e6204e5ff5f8b0e2e/570536ec26fbd26467871cce_tarjeta_correos.jpg',
        paragraph: 'La misión era clara, Correos tenía un nuevo producto, una tarjeta prepago dirigida a todos los públicos y nos pidió que diseñáramos el escaparate web y la experiencia de usuario y visual de su aplicación móvil.',
        lists: [{
          id: 'Experiencia de usuarios',
          tittle:'Experiencia de usuarios'
        }, {
          id: 'Diseño de app',
          tittle: 'Diseño de app',
        }],
        modules: [{
          tittle: 'Modulo',
          paragraph: 'asdasd',
          img: ''
        }]
      }],
      editing : false,
      snackbar : false,
      projectUpdateId: false,
      editingProject: {
        id: '',
        tittle: '',
        img: '',
        paragraph: '',
        lists: [],
        modules: []
      }
    };
  }

  handleChange(element, value) {
    this.setState({ [element] : value });
  }

  handleClick(editing) {
    if (editing) {
      this.setState({ editing : false });
    } else {
      this.setState({ editing : true });
    }
  }

  handleSave() {
    this.setState({ snackbar : true });
    console.log('Se va a guardar -->');
    console.log(this.state.projects);
  }

  handleSnackbarTimeout() {
    this.setState({ snackbar : false });
  }

  saveProject(project) {
    let newProjectState = this.state.projects.slice();
    newProjectState.push(project); 
    this.setState({ 
      projects: newProjectState,
      editing: false,
      editingProject: {
        id: '',
        tittle: '',
        img: '',
        paragraph: '',
        lists: [],
        modules: []
      }
    });
  }

  updateProjectFunc(updatedProject) {
    let newProject = Object.assign({}, updatedProject);
    let projectsState = this.state.projects.slice();
    let newState = projectsState.filter((project) => project.id !== newProject.id);
    newProject.id = newProject.tittle;
    newState.push(newProject);
    this.setState({ 
      projects: newState, 
      editing: false,
      projectUpdateId: false,
      editingProject: {
        id: '',
        tittle: '',
        img: '',
        paragraph: '',
        lists: [],
        modules: []
      }
    });
  }

  updateProject(ev, projectId, el) {
    if (el.target.innerHTML === 'delete') {
      ev.deleteProject(ev, projectId);
    } else {
      let editingProject = ev.state.projects.slice();
      editingProject.map( (project) =>{
        if (project.id === projectId) {
          ev.setState({ editing: true, editingProject: project, projectUpdateId: projectId });
        }
      });
    }
  }

  deleteProject(ev, projectId) {
    debugger;
    let newProjectsState = ev.state.projects.filter((project) => project.id !== projectId);
    this.setState({ projects: newProjectsState });
  }

  render() {
    return (
      <section className="projects">
        { !this.state.editing ? (
          <article>
            <h2>Configuracion de la página Proyectos</h2>
            <Input type='text' label='Titulo' value={this.state.tittle} onChange={this.handleChange.bind(this, 'tittle')}/>
            <List selectable ripple>
              <ListSubHeader caption='Lista de proyectos' />
              {this.state.projects.map( (project, index) => <ListItem key={index} avatar={project.img} onClick={this.updateProject.bind(null, this, project.id) } caption={project.tittle} rightIcon='delete' /> )}
            </List>
            <Button label='Añadir un nuevo proyecto' flat  onClick={() => this.handleClick(this.state.editing)} />
            <Button label='Modificar la pagina Proyectos' flat  onClick={() => this.handleSave()} />   
            <Snackbar
              active={this.state.snackbar}
              icon='question_answer'
              label='¿Info guardada?'
              timeout={2000}
              onTimeout={() => this.handleSnackbarTimeout()}
              ref='snackbar'
              type='accept'
            />
          </article>
      ) : (<AgregarProyecto project={this.state.editingProject} isUpdate={this.state.projectUpdateId} saveProject={ this.state.projectUpdateId === false ? this.saveProject : this.updateProjectFunc} />) }
    </section>
    );
  }
}

export default Proyectos;
