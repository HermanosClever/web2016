import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';
import Snackbar from 'react-toolbox/lib/snackbar';

export class BackofficeHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      h1 : '',
      h2 : '',
      slider1: '',
      slider2: '',
      slider3: '',
      slider4: '',
      snackbar : false
    };
  }

  handleInput(element, value) {
    this.setState({ [element] : value });
  }

  saveHomeInfo(element) {
    console.log('Se van a guardar los siguientes datos:');
    console.log(this.state);
    this.setState({ snackbar : true });
  }

  snackbarTimeout(event, instance) {
    this.setState({ snackbar : false });
  };

  files(element, value) {
    console.log(element);
    console.log(value);
  }

  render() {
    return (
			<section className="backoffice-home">
				<h2>Modificar la página Home</h2>
        <Input type='text' label='Título' h1='h1' value={this.state.h1} onChange={this.handleInput.bind(this, 'h1')}/>
        <Input type='text' label='Descripción' h2='h2' value={this.state.h2} onChange={this.handleInput.bind(this, 'h2')}/>
        <div className="img-slider">
          <input type='file' accept="image/*" onChange={this.files.bind(this, 'slider1')} />
          <input type='file' accept="image/*" onChange={this.files.bind(this, 'slider2')} />
          <input type='file' accept="image/*" onChange={this.files.bind(this, 'slider3')} />
          <input type='file' accept="image/*" onChange={this.files.bind(this, 'slider4')} />
        </div>
        <Button label='Guardar' flat  onClick={this.saveHomeInfo.bind(this)} />			
        <Snackbar
          active={this.state.snackbar}
          action='Aceptar'
          icon='question_answer'
          label='Cambios guardados correctamente.'
          timeout={2000}
          onTimeout={this.snackbarTimeout.bind(this, '')}
          ref='snackbar'
          type='accept'
        />
      </section>
    );
  }
}

export default BackofficeHome;
