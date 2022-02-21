import React from 'react';
import Home from './pages/home';
import Calculator from './pages/calculator';
import NotFound from './pages/not-found';
import parseRoute from './library/parse-route';
import Meals from './pages/meals';
import Exercises from './pages/exercises';
import Codex from './pages/codex';

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
    return <NotFound />;
  }

  render() {
    return <>
      {this.renderPage()}
    </>;
  }
}
