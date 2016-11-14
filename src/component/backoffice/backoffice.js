import React, { Component } from 'react';
import Login from './login';
import Home from './home';
import Proyectos from './proyectos';
import Clientes from './clientes';
import Nosotros from './nosotros';
import Contacto from './contacto';

export class Backoffice extends Component {

	constructor(props) {
  super(props);
  this.state = {
    index : false,
    login : true
  };
}
  
  navTo(component) {
    this.setState({ index : component });
  }


  render() {

    return (
			<section className="backoffice ">
        <div>
          {
            !this.state.login ?
            ( < Login /> ) : (
            <div>
              <div className="left-menu">
              <h2 onClick={ () => this.navTo(Home) }>Home</h2>
              <h2 onClick={ () => this.navTo(Proyectos) }>Proyectos</h2>
              <h2 onClick={ () => this.navTo(Clientes) }>Clientes</h2>
              <h2 onClick={ () => this.navTo(Nosotros) }>Nosotros</h2>
              <h2 onClick={ () => this.navTo(Contacto) }>Contacto</h2>
              </div>
              <div className="right-component">
                { this.state.index ? <this.state.index /> : null }
              </div>
            </div>
            )
          }
        </div>
			</section>
    );
  }
}

export default Backoffice;
