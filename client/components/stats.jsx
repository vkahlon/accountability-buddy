import React from 'react';
import Header from './header';
export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: this.props.stats
    };
  }

  render() {
    const calories = this.state.stats.results.dailyCalorie;
    return (
      <>
        <Header header={'Your Stats'} />
        <h1>Your Calories: {calories}</h1>
      </>
    );
  }
}
