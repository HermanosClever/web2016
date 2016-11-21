import React, { Component } from 'react';
import { List, ListItem, ListSubHeader } from 'react-toolbox/lib/list';
import Input from 'react-toolbox/lib/input';
import TinyMCE from 'react-tinymce';
import Button from 'react-toolbox/lib/button';

export class AgregarProyecto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newProject:this.props.project,
      editingTittle: false,
      updateTittle: false,
      newList: {
        id: '',
        tittle: ''
      },
      newModule: [{
        id: '',
        tittle: '',
        paragraph: '',
        img: ''
      }],
      step: 1
    };
  }

  changeStep(direction) {
    this.setState({ step: this.state.step + direction });
  }

  changeNewListInfo(element, value) {
    let aux = Object.assign({}, this.state.newList, { [element] : value } );
    this.setState({ newList : aux });
  }

  changeNewModuleInfo(element, value) {
    let aux = Object.assign({}, this.state.newModule, { [element] : value } );
    this.setState({ newModule : aux });
  }

  changeNewProjectInfo(element, value) {
    let aux = Object.assign({}, this.state.newProject, { [element] : value } );
    this.setState({ newProject : aux });
  }

  addCharacteristic() {
    let newListsState = this.state.newProject.lists.slice();
    newListsState.push({ id: this.state.newList.tittle, tittle: this.state.newList.tittle });
    let newProjectState = Object.assign({}, this.state.newProject, { lists: newListsState });
    this.setState({ newProject: newProjectState, newList: { id: '', tittle: '' }, editingTittle: false });
  }

  addModule() {
    let newModulesState = this.state.newProject.modules.slice();
    newModulesState.push({ 
      id: this.state.newModule.tittle,
      tittle: this.state.newModule.tittle,
      paragraph: this.state.newModule.paragraph,
      img: this.state.newModule.img
    });
    let newProjectState = Object.assign({}, this.state.newProject, { modules: newModulesState });
    this.setState({ newProject: newProjectState, newModule: { id: '', tittle: '', paragraph: '', img: '' }, editingTittle: false });
  }

  loadUpdateMode(ev, listId, el) {
    if (el.target.innerHTML === 'delete') {
      ev.deleteCharacteristic(ev, listId);
    } else {
      ev.state.newProject.lists.map( (list) => {
        if (list.id === listId) {
          ev.setState({ newList: { id: list.tittle, tittle: list.tittle }, editingTittle: true, updateTittle: true });
        } 
      });
    }
  }

  loadModuleUpdateMode(ev, moduleId, el) {
    if (el.target.innerHTML === 'delete') {
      ev.deleteModule(ev, moduleId);
    } else {
      this.state.newProject.modules.map( (module) => {
        if (module.id === moduleId) {
          this.setState({ 
            newModule: { 
              id: module.id,
              tittle: module.tittle,
              paragraph: module.paragraph,
              img: module.img
            },
            editingTittle: true,
            updateTittle: true
          });
        }
      });
    }
  }

  deleteCharacteristic(ev, listId) {
    let newListsState = ev.state.newProject.lists.slice();
    let aux = newListsState.filter( (list) => list.id !== listId );
    let newProjectState = Object.assign({}, ev.state.newProject, { lists: aux });
    ev.setState({ newProject: newProjectState, editingTittle: false, updateTittle: false });
  }

  deleteModule(ev, moduleId) {
    debugger;
    let newModulesState = ev.state.newProject.modules.slice();
    let aux = newModulesState.filter( (module) => module.id !== moduleId );
    let newProjectState = Object.assign({}, ev.state.newProject, { modules: aux });
    ev.setState({ newProject: newProjectState, editingTittle: false, updateTittle: false });
  }

  toogleEditMode() {
    if (this.state.editingTittle) {
      this.setState({ editingTittle: false });
    } else {
      this.setState({ 
        editingTittle: true,
        update: false,
        newList: { 
          id: '', 
          tittle: '' 
        },
        newModule: {
          id: '', 
          tittle: '', 
          paragraph: '', 
          img: '' 
        } 
      });
    }
  }

  updateCharacteristic() {
    let aux = Object.assign({}, this.state.newProject);
    aux.lists.map( (list) => {
      if (this.state.newList.id === list.id) {
        list.id = this.state.newList.tittle;
        list.tittle = this.state.newList.tittle;
      }
    });
    this.setState({ newProject: aux, newList: { id: '', tittle: '' }, editingTittle: false, updateTittle: false });
  }

  updateModule() {
    let aux = Object.assign({}, this.state.newProject);
    aux.modules.map( (module) => {
      if (this.state.newModule.id === module.id) {
        module.id = this.state.newModule.tittle;
        module.tittle = this.state.newModule.tittle;
        module.paragraph = this.state.newModule.paragraph;
        module.img = this.state.newModule.img;
      }
    });
    this.setState({
      newProject: aux,
      newModule: { 
        id: '',
        tittle: '',
        paragraph: '',
        img: ''
      },
      editingTittle: false,
      updateTittle: false
    });
  }

  editorChangeInfo(tipo, e) {
    if (tipo === 'paragraph') {
      let content = e.target.getContent();
      let newState = Object.assign({}, this.state.newProject, { 'paragraph' : content });
      this.setState({ newProject: newState });
    }
    if (tipo === 'newModule') {
      let content = e.target.getContent();
      let newState = Object.assign({}, this.state.newModule, { 'paragraph' : content });
      this.setState({ newModule: newState });
    }
  }

  render() {

    let step = this.state.step;

    return (
			<section className="add-project">
        <article>
          <h2>Añadiendo un nuevo proyecto</h2>
          { step === 1 ? (
          <div>
            <Input type="text" label="Titulo del nuevo proyecto" value={this.state.newProject.tittle} onChange={this.changeNewProjectInfo.bind(this, 'tittle')}/>
            Descripción del proyecto:
            <TinyMCE
              content={this.state.newProject.paragraph}
              config={{
                plugins: 'autolink link image lists print preview',
                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code | link'
              }}
              onChange={this.editorChangeInfo.bind(this, 'paragraph')}
            />
          </div>
          ) : null }
          { step === 2 ? (
            <div>
              <List selectable ripple>
                <ListSubHeader caption='Lista de características:' />
                {this.state.newProject.lists.map( (list, index) => <ListItem key={index} caption={list.tittle} onClick={this.loadUpdateMode.bind(null, this, list.id)} rightIcon='delete' /> )}
              </List>
              { this.state.editingTittle ? (
                <div className="modal">
                  <div className="modal-content">
                    <Input type='text' label='Titulo de la característica' value={this.state.newList.tittle} onChange={this.changeNewListInfo.bind(this, 'tittle')}/>
                    <Button label="Cancelar" flat onClick={() => this.toogleEditMode()} />
                    {this.state.updateTittle ? <Button label="Actualizar característica" flat onClick={() => this.updateCharacteristic()} />
                    : <Button label="Guardar característica" flat onClick={() => this.addCharacteristic()} />}  
                  </div>
                </div>
              ) : null }
              <Button label="Añadir característica" flat  onClick={() => this.toogleEditMode()} />
            </div>
          ) : null }
          { step === 3 ? (
          <div>
            <List selectable ripple>
              <ListSubHeader caption='Lista de modulos:' />
              {this.state.newProject.modules.map( (module, index) => <ListItem key={index} caption={module.tittle} onClick={this.loadModuleUpdateMode.bind(null, this, module.id)} rightIcon='delete' /> )}
            </List>
            { this.state.editingTittle ? (
            <div className="modal">
              <div className="modal-content">
                <Input type='text' label='Titulo del modulo' titulo='titulo' value={this.state.newModule.tittle} onChange={this.changeNewModuleInfo.bind(this, 'tittle')}/>
                <TinyMCE
                  content={this.state.newModule.paragraph}
                  config={{
                    plugins: 'autolink link image lists print preview',
                    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code | link'
                  }}
                  onChange={this.editorChangeInfo.bind(this, 'newModule')}
                />
                <input type='file' accept="image/*" />
                <Button label="Cancelar" flat onClick={() => this.toogleEditMode()} />
                {this.state.updateTittle ? <Button label="Actualizar modulo" flat onClick={() => this.updateModule()} />
                : <Button label="Guardar modulo" flat onClick={() => this.addModule()} />
                }
              </div>
            </div>
            ) : null }
            <Button label="Crear un modulo" flat  onClick={() => this.toogleEditMode()} />
          </div>
          ) : null }
            {step === 1 ? <Button label="Anterior" disabled={true} flat /> : <Button label="Anterior" onClick={() => this.changeStep(-1)} flat />}
            <div>Paso {step} de 3</div>
            {step !== 3 ? <Button label="Siguiente" onClick={() => this.changeStep(+1)} flat /> : <Button label={this.props.isUpdate === false ? 'Guardar proyecto' : 'Actualizar proyecto'} onClick={ () => this.props.saveProject(this.state.newProject) } flat />}
        </article>
      </section>
    );
  }
}

export default AgregarProyecto;
