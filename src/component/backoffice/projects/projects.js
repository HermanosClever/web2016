import React, { Component, PropTypes } from 'react';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';
import Snackbar from 'react-toolbox/lib/snackbar';
import AgregarProyecto from './agregar-proyecto';
import { List, ListItem, ListSubHeader } from 'react-toolbox/lib/list';

export class Projects extends Component {
  constructor(props) {
    super(props);
    this.saveProject = this.saveProject.bind(this);
    this.updateProjectFunc = this.updateProjectFunc.bind(this);
    this.state = {
      projectInfo: props.projectInfo,
      tittle : '',
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

  componentDidMount() {
    this.props.getProjectState();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({ projectInfo: this.props.projectInfo });
    }
  }

  handleChange(element, value) {
    var aux = Object.assign({}, this.state.projectInfo, { [element]: value });
    this.setState({ projectInfo: aux });
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
    this.setState({ 
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
    this.props.addProject(project, this.state.projectInfo._id);
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
      let editingProject = ev.state.projectInfo.projects.slice();
      editingProject.map( (project) =>{
        if (project._id === projectId) {
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
            <Input type='text' label='Titulo' value={this.state.projectInfo.tittle} onChange={this.handleChange.bind(this, 'tittle')}/>
            <List selectable ripple>
              <ListSubHeader caption='Lista de proyectos' />
              {this.state.projectInfo.projects.map( (project, index) => <ListItem key={index} avatar={project.img} onClick={this.updateProject.bind(null, this, project._id) } caption={project.tittle} rightIcon='delete' /> )}
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

Projects.propTypes = {
  projectInfo: PropTypes.object.isRequired,
  getProjectState: PropTypes.func.isRequired,
  addProject: PropTypes.func.isRequired
};

export default Projects;
