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
      step: 0
    };
  }

  changeStep() {
    this.setState({ step: this.state.step + 1 });
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

  loadUpdateMode(listId) {
    this.state.newProject.lists.map( (list) => {
      if (list.id === listId) {
        this.setState({ newList: { id: list.tittle, tittle: list.tittle }, editingTittle: true, updateTittle: true });
      } 
    });
  }

  loadModuleUpdateMode(moduleId) {
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

  deleteCharacteristic() {
    let newListsState = this.state.newProject.lists.slice();
    let aux = newListsState.filter( (list) => list.id !== this.state.newList.id );
    let newProjectState = Object.assign({}, this.state.newProject, { lists: aux });
    this.setState({ newProject: newProjectState, editingTittle: false, updateTittle: false });
  }

  deleteModule() {
    let newModulesState = this.state.newProject.modules.slice();
    let aux = newModulesState.filter( (module) => module.id !== this.state.newModule.id );
    let newProjectState = Object.assign({}, this.state.newProject, { modules: aux });
    this.setState({ newProject: newProjectState, editingTittle: false, updateTittle: false });
  }

  correctButton() {
    if (!this.state.editingTittle) {
      return <Button label="Crear una característica" flat  onClick={() => this.toogleEditMode()} />;
    }else {
      if (this.state.updateTittle ) {
        return (
          <div>
            <Button label="Borrar característica" flat onClick={() => this.deleteCharacteristic()} /> 
            <Button label="Actualizar característica" flat onClick={() => this.updateCharacteristic()} />
          </div>
        );
      }else {
        return <Button label="Guardar característica" flat onClick={() => this.addCharacteristic()} />;
      }
    }
  }

  modulesCorrectButton() {
    if (!this.state.editingTittle) {
      return <Button label="Crear un modulo" flat  onClick={() => this.toogleEditMode()} />;
    }else {
      if (this.state.updateTittle ) {
        return (
          <div>
            <Button label="Borrar modulo" flat onClick={() => this.deleteModule()} /> 
            <Button label="Actualizar modulo" flat onClick={() => this.updateModule()} />
          </div>
        );
      }else {
        return <Button label="Guardar modulo" flat onClick={() => this.addModule()} />;
      }
    }
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
        list.tittle = this.state.newList.tittle;
      }
    });
    this.setState({ newProject: aux, newList: { id: '', tittle: '' }, editingTittle: false, updateTittle: false });
  }

  updateModule() {
    let aux = Object.assign({}, this.state.newProject);
    aux.modules.map( (module) => {
      if (this.state.newModule.id === module.id) {
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
			<section className="agregar-proyecto">
        <article>
          <h2>Añadiendo un nuevo proyecto</h2>
          { step === 0 ? (
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
            <Button label="Siguiente" onClick={ () => this.changeStep() } flat />
          </div>
          ) : null }
          { step === 1 ? (
            <div>
              <List selectable ripple>
                <ListSubHeader caption='Lista de características:' />
                {this.state.newProject.lists.map( (list, index) => <ListItem key={index} caption={list.tittle} onClick={() => this.loadUpdateMode(list.id)} rightIcon='delete' /> )}
              </List>
              { this.state.editingTittle ? (
                <div>
                  <Input type='text' label='Titulo de la característica' value={this.state.newList.tittle} onChange={this.changeNewListInfo.bind(this, 'tittle')}/>
                </div>
              ) : null }
              { this.correctButton() }
              <Button label="Siguiente" onClick={ () => this.changeStep() } flat />
            </div>
          ) : null }
          { step === 2 ? (
          <div>
            <List selectable ripple>
              <ListSubHeader caption='Lista de modulos:' />
              {this.state.newProject.modules.map( (module, index) => <ListItem key={index} caption={module.tittle} onClick={() => this.loadModuleUpdateMode(module.id)} rightIcon='delete' /> )}
            </List>
            { this.state.editingTittle ? (
            <div>
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
            </div>
            ) : null }
            { this.modulesCorrectButton() }
            <Button label="Guardar proyecto" onClick={ () => this.props.saveProject(this.state.newProject) } flat />
          </div>
          ) : null }
        </article>
      </section>
    );
  }
}

export default AgregarProyecto;
