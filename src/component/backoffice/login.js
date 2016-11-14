import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';
import { Link } from 'react-router';

// NOTE: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class Login extends Component {

	constructor(props) {
  super(props);
  this.state = {
    name: '',
    password: ''
  };
}

  handleChange(element, value) {
    console.log(element);
    console.log(value);
    this.setState({ [element] : value });
  }

  render() {
    return (
			<section className="login">
				<h2>Login</h2>
				<Input type='text' label='Usuario' name='name' value={this.state.name} onChange={this.handleChange.bind(this, 'name')}/>
				<Input type='password' label='Contraseña' password='password' value={this.state.password} onChange={this.handleChange.bind(this, 'password')}/>
				<Link to={`/backoffice/menu`}><Button label='Entrar' flat /></Link>
			</section>
    );
  }
}

export default Login;
