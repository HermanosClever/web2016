import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';
import Snackbar from 'react-toolbox/lib/snackbar';

export class Contacto extends Component {

	constructor(props) {
  super(props);
  this.state = {
    email : '',
    phone : '',
    street : '',
    twitter : '',
    facebook : '',
    snackbar : false
  };
}

  handleInputInfo(element, value) {
    this.setState({ [element] : value });
  }

  handleClick() {
    this.setState({ snackbar : true });
    console.log('Resultado a guardar -->');
    console.log(this.state);
    this.setState({
      email : '',
      phone : '',
      street : '',
      twitter : '',
      facebook : '',
      snackbar : false
    });
  }

  handleSnackbarTimeout(event, instance) {
    this.setState({ snackbar : false });
  };

  render() {
    return (
			<section className="contact">
				<h2>Modificar página de contacto</h2>
				
        <Input type='text' label='Dirección' street='street' value={this.state.street} onChange={this.handleInputInfo.bind(this, 'street')} />
        <Input type='text' label='Twitter' twitter='twitter' value={this.state.twitter} onChange={this.handleInputInfo.bind(this, 'twitter')} />
        <Input type='text' label='Facebook' facebook='facebook' value={this.state.facebook} onChange={this.handleInputInfo.bind(this, 'facebook')} />
        <Input type='email' label='Email' email='email' value={this.state.email} onChange={this.handleInputInfo.bind(this, 'email')} />
        <Input type='tel' label='Telefono de contacto' phone='phone' value={this.state.phone} onChange={this.handleInputInfo.bind(this, 'phone')} />
        <input type='file' accept="image/*" />
        <Button label='Guardar cambios en la pagina Contacto' flat  onClick={() => this.handleClick()} />      
        <Snackbar
          active={this.state.snackbar}
          action='Aceptar'
          icon='question_answer'
          label='Cambios guardados correctamente.'
          timeout={5000}
          onTimeout={this.handleSnackbarTimeout.bind(this, '')}
          ref='snackbar'
          type='accept'
        />
			</section>
    );
  }
}

export default Contacto;
