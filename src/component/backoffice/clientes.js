import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';
import Snackbar from 'react-toolbox/lib/snackbar';
import { List, ListItem, ListSubHeader } from 'react-toolbox/lib/list';

export class Clientes extends Component {

	constructor(props) {
  super(props);
  this.state = {
    clients: [{
      id: 0,
      tittle: 'Vodafone',
      img: 'https://dl.dropboxusercontent.com/u/2247264/assets/m.jpg',
      url: 'vodafone.com'
    }, {
      id: 1,
      tittle: 'La gula',
      img: 'https://dl.dropboxusercontent.com/u/2247264/assets/o.jpg',
      url: 'lagula.com'
    }, {
      id:2,
      tittle: 'Correos',
      img: 'https://dl.dropboxusercontent.com/u/2247264/assets/r.jpg',
      url: 'correos.es'
    }],
    newClient: {
      tittle: '',
      img: '',
      url: ''
    },
    editing: false, 
    snackbar: false,
    update: false

  };
}

  changeClientInfo(element, value) {
    let aux = { [element]: value };
    let newState = Object.assign({}, this.state.newClient, aux);
    this.setState({ newClient: newState });
  }

  addClient() {
    let aux = this.state.clients.slice();
    let newClient = Object.assign({}, this.state.newClient, { id: this.state.newClient.tittle });
    aux.push(newClient);
    this.setState({ clients: aux,
                    editing: false,
                    snackbar: true,
                    newClient: {
                      tittle: '',
                      img: '',
                      url: '' 
                    }
                  });
  }

  deleteClient(clientId) {
    let clientsState = this.state.clients.slice();
    let newClientsState = clientsState.filter( client => client.id !== clientId);
    this.setState({ clients: newClientsState, editing: false }); 
  }

  sendUpdate(clientId) {
    let newStateClients = this.state.clients.slice();
    newStateClients.map( client => {
      if (client.id === clientId) {
        client.tittle = this.state.newClient.tittle;
        client.img = this.state.newClient.img;
        client.url = this.state.newClient.url;
        this.setState({ clients: newStateClients, editing: false });
      }
    });
  }

  loadUpdateMode(clientId) {
    this.state.clients.map( client => {
      if (client.id === clientId) {
        let aux = {
          id: client.id,
          tittle: client.tittle,
          img: client.img,
          url: client.url
        };
        this.setState({ editing: true,
                        newClient: aux,
                        update: client.id
                      });
      }
    });
  }

  snackbarTimeout() {
    this.setState({ snackbar: false });
  }

  toogleEditMode() {
    if (this.state.editing) {
      this.setState({ editing: false });
    } else {
      this.setState({ editing: true, update: false, newClient: { tittle: '', img: '', url: '' } });
    }
  }

  render() {
    return (
			<section className="clients">
        <article>
          <List selectable ripple>
            <ListSubHeader caption="Lista de clientes" />
            {this.state.clients.map( (client, index) => <ListItem key={index} onClick={() => this.loadUpdateMode(client.id)} avatar={client.img} caption={client.tittle} rightIcon="delete" /> )}
          </List>
          <Button label="Agregar un nuevo cliente" flat  onClick={() => this.toogleEditMode()} />
          { this.state.editing ? (
          <div>
            <Input type="text" label="Titulo" tittle="tittle" value={this.state.newClient.tittle} onChange={this.changeClientInfo.bind(this, 'tittle')}/>
            <input type="file" accept="image/*" />
            <Input type="text" label="Url" url='url' value={this.state.newClient.url} onChange={this.changeClientInfo.bind(this, 'url')}/>
            {this.state.update === false ? (<Button label="Guardar" flat  onClick={() => this.addClient()} />)
            : (<div><Button label="Borrar" flat onClick={() => this.deleteClient(this.state.update)} /><Button label="Actualizar" flat onClick={() => this.sendUpdate(this.state.update)} /></div>)}
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

export default Clientes;
