import React, { Component, PropTypes } from 'react';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';
import Snackbar from 'react-toolbox/lib/snackbar';

export class BackofficeHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homeObject: {},
      snackbar: false
    };
  }

  componentDidMount() {
    this.props.getHomeInfo();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({ homeObject: this.props.homeInfo });
    }
  }

  bindInputWithState(element, value) {
    let newHomeState = Object.assign({}, this.state.homeObject, { [element]: value } );
    this.setState({ homeObject: newHomeState });
  }

  savePageHome() {
    this.props.putHome(this.state.homeObject);
    this.setState({ snackbar: true });
  }

  snackbarTimeout(event, instance) {
    this.setState({ snackbar: false });
  };

  files(element, value) {
    console.log(element);
    console.log(value);
  }

  render() {
    return (
			<section className="backoffice-home">
				<h2>Modificar la página Home</h2>
        <Input type='text' label='Título' h1='h1' value={this.state.homeObject.tittle} onChange={this.bindInputWithState.bind(this, 'tittle')}/>
        <Input type='text' label='Descripción' h2='h2' value={this.state.homeObject.description} onChange={this.bindInputWithState.bind(this, 'description')}/>
        <div className="img-slider">
          <input type='file' accept="image/*" onChange={this.files.bind(this, 'slider1')} />
          <input type='file' accept="image/*" onChange={this.files.bind(this, 'slider2')} />
          <input type='file' accept="image/*" onChange={this.files.bind(this, 'slider3')} />
          <input type='file' accept="image/*" onChange={this.files.bind(this, 'slider4')} />
        </div>
        <Button label='Actualizar la página home' flat  onClick={()=> this.savePageHome()} />			
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

BackofficeHome.propTypes = {
  homeInfo: PropTypes.object.isRequired,
  getHomeInfo: PropTypes.func.isRequired,
  putHome: PropTypes.func.isRequired
};


export default BackofficeHome;
