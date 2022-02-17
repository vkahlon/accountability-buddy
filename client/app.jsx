import React from 'react';
import Home from './pages/home';
import Calculator from './pages/calculator';
import NotFound from './pages/not-found';
import parseRoute from './library/parse-route';
import Stats from './pages/stats';

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
    if (route.path === 'stats') {
      return <Stats />;
    }
    return <NotFound />;
  }

  render() {
    return <>
      {this.renderPage()}
    </>;
  }
}
