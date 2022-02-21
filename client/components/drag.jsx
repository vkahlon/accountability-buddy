import React from 'react';
export default class Drag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      isLoading: true
    };
  }

  render() {
    return (
      <h4 style={{ textAlign: 'center' }}>{this.props.codex.dailyCalorie} Calories Remaining</h4>
    );
  }
}
