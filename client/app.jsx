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
import Navbar from './components/navbar';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
    const token = window.localStorage.getItem('buddy-access-jwt');
    const user = token ? decodeToken(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home user={this.state.user} />;
    }
    if (route.path === 'calculator') {
      return <Calculator user={this.state.user} />;
    }
    if (route.path === 'meals') {
      return <Meals user={this.state.user} />;
    }
    if (route.path === 'exercises') {
      return <Exercises user={this.state.user} />;
    }
    if (route.path === 'codex') {
      return <Codex user={this.state.user} />;
    }
    if (route.path === 'edit-meal') {
      return <EditMeal user={this.state.user} />;
    }
    if (route.path === 'edit-exercise') {
      return <EditExercise user={this.state.user} />;
    }
    if (route.path === 'register') {
      return <Register user={this.state.user} />;
    }
    if (route.path === 'sign-in') {
      return <SignIn user={this.state.user} />;
    }
    return <NotFound />;
  }

  render() {
    if (this.state.isAuthorizing) return null;
    return <>
      <Navbar user={this.state.user} />
      {this.renderPage()}
    </>;
  }
}
