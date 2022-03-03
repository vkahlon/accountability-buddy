import React from 'react';
import Home from './pages/home';
import Calculator from './pages/calculator';
import NotFound from './pages/not-found';
import parseRoute from './library/parse-route';
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
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'calculator') {
      return <Calculator />;
    }
    if (route.path === 'meals') {
      return <Meals />;
    }
    if (route.path === 'exercises') {
      return <Exercises />;
    }
    if (route.path === 'codex') {
      return <Codex />;
    }
    if (route.path === 'edit-meal') {
      return <EditMeal />;
    }
    if (route.path === 'edit-exercise') {
      return <EditExercise />;
    }
    if (route.path === 'register') {
      return <Register />;
    }
    if (route.path === 'sign-in') {
      return <SignIn />;
    }
    return <NotFound />;
  }

  render() {
    return <>
      {this.renderPage()}
    </>;
  }
}
