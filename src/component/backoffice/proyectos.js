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
    let newState = this.state.proyectos;
    newState.push(this.state.newProject);
    this.setState({ snackbar : true });
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

  updateProject(projectId) {
    let editingProject = this.state.projects.slice();
    editingProject.map( (project) =>{
      if (project.id === projectId) {
        this.setState({ editing: true, editingProject: project });
      }
    });
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
              {this.state.projects.map( (project, index) => <ListItem key={index} avatar={project.img} onClick={() => this.updateProject(project.id) } caption={project.tittle} rightIcon='delete' /> )}
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
      ) : (<AgregarProyecto project={this.state.editingProject} saveProject={this.saveProject} />) }
    </section>
    );
  }
}

export default Proyectos;
