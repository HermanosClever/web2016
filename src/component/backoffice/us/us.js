import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';
import Snackbar from 'react-toolbox/lib/snackbar';
import { List, ListItem, ListSubHeader } from 'react-toolbox/lib/list';
import TinyMCE from 'react-tinymce';

export class Us extends Component {

	constructor(props) {
  super(props);
  this.state = {
    tittle: 'Hola',
    paragraph: '',
    modules: [{
      id: 'UI/UX Design',
      tittle: 'UI/UX Design',
      paragraph: 'asdasd',
      img: 'https://daks2k3a4ib2z.cloudfront.net/56ab386e6204e5ff5f8b0e2e/570df92fa6123f7a3b4a5ccf_ui_ux_illustration.png'
    }, {
      id: 'Estrategia Digital',
      tittle: 'Estrategia Digital',
      paragraph: 'asdasd',
      img: 'https://daks2k3a4ib2z.cloudfront.net/56ab386e6204e5ff5f8b0e2e/570df95fefd5192b3b7ad910_strategy_illustration.png'
    }, {
      id: 'Desarrollos a medida',
      tittle: 'Desarrollos a medida',
      paragraph: 'asdasd',
      img: 'https://daks2k3a4ib2z.cloudfront.net/56ab386e6204e5ff5f8b0e2e/570df9a6e725ba4e712c85c3_development_illustration.png'
    }],
    update : false,
    editing: false,
    snackbar: false,
    modal: true,
    newModule: {
      id: '',
      tittle: '',
      paragraph: '',
      img: ''
    }
  };
}

  handleInputs(element, value) {
    this.setState({ [element]: value });
  }

  handleNewModuleInputs(element, value) {
    let newState = Object.assign({}, this.state.newModule, { [element]: value });
    this.setState({ newModule: newState });
  }

  toogleEditMode() {
    if (this.state.editing) {
      this.setState({ editing: false });
    } else {
      this.setState({ editing: true, update: false });
    }
  }

  savePageInfo() {
    this.setState({ snackbar: true });
    console.log('Estado de la aplicación a guardar -->');
    console.log(this.state);
  }

  snackbarTimeout() {
    this.setState({ snackbar: false });
  }

  saveParagraphInfo(ev, type, el) {
    let content = el.target.getContent(); 
    if (type === 'paragraph-page') {
      ev.setState({ paragraph: content });
    }
    if (type === 'paragraph-module') {
      let newState = Object.assign({}, ev.state.newModule, { paragraph: content });
      ev.setState({ newModule: newState });
    }
  }

  saveModule() {
    let newModulesState = this.state.modules.slice();
    newModulesState.push(this.state.newModule);
    this.setState({ modules: newModulesState,
                    editing: false,
                    newModule: { id: '', tittle: '', paragraph: '', img: '' }
                 });
  }

  update() {
    let aux = this.state.modules.slice();
    aux.map(( module )=> {
      if (module.id === this.state.newModule.id) {
        module.id = this.state.newModule.tittle;
        module.tittle = this.state.newModule.tittle;
        module.paragraph = this.state.newModule.paragraph;
        module.img = this.state.newModule.img;
      }
    });

    this.setState({ modules: aux, editing: false, newModule: { id: '', tittle: '', paragraph: '', img: '' } });
  }

  updateMode(ev, id, tittle, paragraph, img, el) {
    if (el.target.innerHTML === 'delete') {
      ev.deleteModule(ev, id);
    } else {
      let aux = { id: id, tittle: tittle, paragraph: paragraph, img: img };
      ev.setState({ update: true, editing: true, newModule: aux });      
    }
  }

  deleteModule(ev, id) {
    let aux = ev.state.modules.slice();
    let newModulesState = aux.filter((module) => module.id !== id);
    ev.setState({ modules: newModulesState });
  }

  render() {
    return (
			<section id="usPage">
        <article>
          <h1>Nosotros</h1>
          <Input type='text' label='Título' tittle='tittle' value={this.state.tittle} onChange={this.handleInputs.bind(this, 'tittle')}/>
          <List selectable ripple>
            <ListSubHeader caption='Lista de modulos' />
            { this.state.modules.map( (module, index) => <ListItem key={index} avatar={module.img} caption={module.tittle} onClick={this.updateMode.bind(null, this, module.id, module.tittle, module.paragraph, module.img)} rightIcon='delete' /> )}
          </List>
          { this.state.editing ? (
            <div className="modal">
              <div className="modal-content">
                <Input type='text' label='Titulo del modulo' tittle='tittle' value={this.state.newModule.tittle} onChange={this.handleNewModuleInputs.bind(this, 'tittle')} />
                <input type='file' accept="image/*" label='Añadir imagen del cliente' />
                <TinyMCE
                  content={this.state.newModule.paragraph}
                  config={{
                    plugins: 'autolink link image lists print preview',
                    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code | link'
                  }}
                  onChange={this.saveParagraphInfo.bind(null, this, 'paragraph-module')}
                />
                <Button label='Cancelar' flat onClick={() => this.toogleEditMode()} />
                <Button label={this.state.update ? 'Actualizar modulo' : 'Guardar modulo'} flat onClick={this.state.update ? () => this.update() : () => this.saveModule()} />
              </div>
            </div>
            ) : <Button label="Agregar un nuevo modulo" flat  onClick={() => this.toogleEditMode()} />		   
          }

          <Button label='Modificar datos' flat  onClick={() => this.savePageInfo()} />     
          <Snackbar
            active={this.state.snackbar}
            icon='question_answer'
            label='¿Info guardada?'
            timeout={2000}
            onTimeout={() => this.snackbarTimeout()}
            ref='snackbar'
            type='accept'
          />
        </article>
      </section>
    );
  }
}

export default Us;
