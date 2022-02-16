import React from 'react';
import Home from './pages/home';
import Calculator from './pages/calculator';
import NotFound from './pages/not-found';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: '#calculator'
    };
  }

  renderPage() {
    const { route } = this.state;
    if (route === '') {
      return <Home />;
    }
    if (route === '#calculator') {
      return <Calculator />;
    }
    return <NotFound />;
  }

  render() {
    return <>
      {this.renderPage()}
    </>;
  }
}
