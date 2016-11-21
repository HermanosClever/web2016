import React, { Component, PropTypes } from 'react';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';
import Snackbar from 'react-toolbox/lib/snackbar';
import { List, ListItem, ListSubHeader } from 'react-toolbox/lib/list';

export class Clients extends Component {

	constructor(props) {
    super(props);
    this.state = {
      newClient: {
        name: '',
        img: '',
        url: ''
      },
      editing: false, 
      snackbar: false,
      update: false
    };
  }

  componentDidMount() {
    this.props.getClients();
  }

  changeClientInfo(element, value) {
    let aux = { [element]: value };
    let newState = Object.assign({}, this.state.newClient, aux);
    this.setState({ newClient: newState });
  }

  addClient() {
    this.props.saveClient(this.state.newClient);
    this.setState({ editing: false, snackbar: true, newClient: { tittle: '', img: '', url: '' } });
  }

  deleteClient(ev, clientId) {
    ev.props.deleteClient(clientId);
    ev.setState({ clients: newClientsState, editing: false }); 
  }

  sendUpdate(clientId) {
    this.props.updateClient(this.state.newClient, this.setState({ editing: false }));
  }

  loadUpdateMode(ev, clientId, el) {
    if (el.target.innerHTML === 'delete') {
      ev.deleteClient(ev, clientId);
    } else {
      ev.props.clientsInfo.map( client => {
        if (client._id === clientId) {
          let aux = {
            _id: client._id,
            name: client.name,
            img: client.img,
            url: client.url
          };
          ev.setState({ editing: true,
                        newClient: aux,
                        update: client._id
                      });
        }
      });
    }
  }

  snackbarTimeout() {
    this.setState({ snackbar: false });
  }

  toogleEditMode() {
    if (this.state.editing) {
      this.setState({ editing: false });
    } else {
      this.setState({ editing: true, update: false, newClient: { name: '', img: '', url: '' } });
    }
  }

  render() {
    return (
			<section className="clients">
        <article>
          <List selectable ripple>
            <ListSubHeader caption="Lista de clientes" />
            {this.props.clientsInfo.map( (client, index) => <ListItem key={index} onClick={this.loadUpdateMode.bind(null, this, client._id)} avatar={client.img} caption={client.name} rightIcon="delete" /> )}
          </List>
          <Button label="Añadir nuevo cliente" flat  onClick={() => this.toogleEditMode()} />
          { this.state.editing ? (
          <div className="modal">
            <div className="modal-content">
              <Input type="text" label="Nombre" value={this.state.newClient.name} onChange={this.changeClientInfo.bind(this, 'name')}/>
              <input type="file" accept="image/*" />
              <Input type="text" label="Url" url='url' value={this.state.newClient.url} onChange={this.changeClientInfo.bind(this, 'url')}/>
              <Button label="Cancelar" flat onClick={() => this.toogleEditMode()} />
              {this.state.update === false ? (
                <Button label="Guardar" flat  onClick={() => this.addClient()} />
              ) : (
                <Button label="Actualizar" flat onClick={() => this.sendUpdate(this.state.update)} />)}
            </div>
          </div> )
          : null 
          }
          <Snackbar
            active={this.state.snackbar}
            icon='question_answer'
            label='Datos guardados correctamente'
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

Clients.propTypes = {
  clientsInfo: PropTypes.array.isRequired,
  getClients: PropTypes.func.isRequired,
  saveClient: PropTypes.func.isRequired
};

export default Clients;
