import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';
import Snackbar from 'react-toolbox/lib/snackbar';
import { List, ListItem, ListSubHeader } from 'react-toolbox/lib/list';
import TinyMCE from 'react-tinymce';

export class Nosotros extends Component {

	constructor(props) {
  super(props);
  this.state = {
    tittle: '',
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
    let aux = this.state.modules.slice();
    aux.push(this.state.newModule);
    this.setState({ modules: aux, snackbar: true });
    console.log('Estado de la aplicación a guardar -->');
    console.log(this.state);
  }

  snackbarTimeout() {
    this.setState({ snackbar: false });
  }

  saveParagraphInfo(type, el) {
    let content = el.target.getContent(); 
    if (type === 'paragraph-page') {
      this.setState({ paragraph: content });
    }
    if (type === 'paragraph-module') {
      let newState = Object.assign({}, this.state.newModule, { paragraph: content });
      this.setState({ newModule: newState });
    }
  }

  saveModule() {
    let newModulesState = this.state.modules.slice();
    newModulesState.push({  id: this.state.newModule.tittle, 
                            tittle: this.state.newModule.tittle,
                            paragraph: this.state.newModule.paragraph,
                            img: this.state.newModule.img
                        });
    this.setState({ modules: newModulesState,
                    editing: false,
                    newModule: { id: '', tittle: '', paragraph: '', img: '' }
                 });
  }

  correctButton() {
    if (!this.state.editing) {
      return <Button label="Agregar un nuevo modulo" flat  onClick={() => this.toogleEditMode()} />;
    }else {
      if (this.state.update ) {
        return <Button label="Actualizar modulo" flat onClick={() => this.update()} />;
      }else {
        return <Button label="Guardar modulo" flat onClick={() => this.saveModule()} />;
      }
    }
  }

  update() {
    let aux = this.state.modules.slice();
    aux.map(( module )=> {
      if (module.id === this.state.newModule.id) {
        module.tittle = this.state.newModule.tittle;
        module.paragraph = this.state.newModule.paragraph;
        module.img = this.state.newModule.img;
      }
    });

    this.setState({ modules: aux, editing: false, newModule: { id: '', tittle: '', paragraph: '', img: '' } });
  }

  updateMode(id, tittle, paragraph, img) {
    let aux = { id: id, tittle: tittle, paragraph: paragraph, img: img };
    this.setState({ update: true, editing: true, newModule: aux });
  }

  render() {
    return (
			<section className="usPage">
        <article>
          <h1>Nosotros</h1>
          <Input type='text' label='Título' tittle='tittle' value={this.state.tittle} onChange={this.handleInputs.bind(this, 'tittle')}/>
          <TinyMCE
            content="<p></p>"
            config={{
              plugins: 'autolink link image lists print preview',
              toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code | link'
            }}
            onChange={this.saveParagraphInfo.bind(this, 'paragraph-page')}
          />
          <List selectable ripple>
            <ListSubHeader caption='Lista de modulos' />
            { this.state.modules.map( (module, index) => <ListItem key={index} avatar={module.img} caption={module.tittle} onClick={() => this.updateMode(module.id, module.tittle, module.paragraph, module.img)} rightIcon='delete' /> )}
          </List>
          { this.correctButton() }
          { this.state.editing ? (
            <div>
              <Input type='text' label='Titulo del modulo' tittle='tittle' value={this.state.newModule.tittle} onChange={this.handleNewModuleInputs.bind(this, 'tittle')} />
              <input type='file' accept="image/*" label='Añadir imagen del cliente' />
              <TinyMCE
                content={this.state.newModule.paragraph}
                config={{
                  plugins: 'autolink link image lists print preview',
                  toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code | link'
                }}
                onChange={this.saveParagraphInfo.bind(this, 'paragraph-module')}
              />
            </div>
            ) : null		   
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

export default Nosotros;
