import React from 'react';

export default class Drag extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.codex;
  }

  render() {
    return (
      <h4 style={{ textAlign: 'center' }}>{this.state.dailyCalorie} Calories Remaining</h4>
    );
  }
}
