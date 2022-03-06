import React from 'react';
import Home from './pages/home';
import Calculator from './pages/calculator';
import NotFound from './pages/not-found';
import parseRoute from './library/parse-route';
import decodeToken from './library/decode-token';
import Meals from './pages/meals';
import Exercises from './pages/exercises';
import Codex from './pages/codex';
import EditMeal from './pages/edit-meal';
import EditExercise from './pages/edit-exercise';
import Register from './pages/register';
import SignIn from './pages/sign-in';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      token: 'undefined',
      route: parseRoute(window.location.hash)
    };
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
    const token = window.localStorage.getItem('buddy-access-jwt');
    const user = token ? decodeToken(token) : 'undefined';
    this.setState({ user, isAuthorizing: false, token });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('buddy-access-jwt', token);
    this.setState({ user });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home token={this.state.token} />;
    }
    if (route.path === 'calculator') {
      return <Calculator token={this.state.token} />;
    }
    if (route.path === 'meals') {
      return <Meals token={this.state.token} />;
    }
    if (route.path === 'exercises') {
      return <Exercises token={this.state.token} />;
    }
    if (route.path === 'codex') {
      return <Codex token={this.state.token} />;
    }
    if (route.path === 'edit-meal') {
      return <EditMeal token={this.state.token} />;
    }
    if (route.path === 'edit-exercise') {
      return <EditExercise token={this.state.token} />;
    }
    if (route.path === 'register') {
      return <Register token={this.state.token} />;
    }
    if (route.path === 'sign-in') {
      return <SignIn token={this.state.token} sign={this.handleSignIn} />;
    }
    return <NotFound />;
  }

  render() {
    if (this.state.isAuthorizing) return null;
    return <>
      {this.renderPage()}
    </>;
  }
}
