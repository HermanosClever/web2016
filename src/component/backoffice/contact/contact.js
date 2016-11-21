import React, { Component, PropTypes } from 'react';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';
import Snackbar from 'react-toolbox/lib/snackbar';

export class Contact extends Component {

	constructor(props) {
    super(props);
    this.state = {
      snackbar : false,
      contact: props.contactInfo,
      disabled: true,
    };
  }

  componentDidMount() {
    this.props.getContact();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({ contact: this.props.contactInfo });
    }
  }

  bindInputToState(element, value) {
    let contactValue = Object.assign({}, this.state.contact, { [element]: value }); 
    this.setState({ contact: contactValue, disabled: false });
  }

  saveContactPage() {
    this.props.putContact(this.state.contact);
    this.setState({ snackbar: true, disabled: true });
  }

  handleSnackbarTimeout(event, instance) {
    this.setState({ snackbar: false });
  };

  render() {

    return (
			<section className="contact">
				<h2>Modificar página de contacto</h2>
        <Input type='text' label='Dirección' street='street' value={this.state.contact.street} onChange={this.bindInputToState.bind(this, 'street')} />
        <Input type='text' label='Twitter' twitter='twitter' value={this.state.contact.twitter} onChange={this.bindInputToState.bind(this, 'twitter')} />
        <Input type='text' label='Facebook' facebook='facebook' value={this.state.contact.facebook} onChange={this.bindInputToState.bind(this, 'facebook')} />
        <Input type='email' label='Email' email='email' value={this.state.contact.email} onChange={this.bindInputToState.bind(this, 'email')} />
        <Input type='tel' label='Telefono de contacto' phone='phone' value={this.state.contact.phone} onChange={this.bindInputToState.bind(this, 'phone')} />
        <input type='file' accept="image/*" />
        <Button label='Modificar la página contacto' flat disabled={this.state.disabled} onClick={() => this.saveContactPage()} />      
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

Contact.propTypes = {
  contactInfo: PropTypes.object.isRequired,
  getContact: PropTypes.func.isRequired,
  putContact: PropTypes.func.isRequired
};

export default Contact;
