import React from 'react';
import Drag from './drag';
export default class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      isLoading: true
    };
  }

  componentDidMount() {
    fetch('api/meals')
      .then(response => response.json())
      .then(data => {
        const mealData = data;
        return mealData;
      });

    fetch('api/exercises')
      .then(response => response.json())
      .then(data => {
        const exerciseData = data;
        return exerciseData;
      });

    fetch('api/user')
      .then(response => response.json())
      .then(data => {
        const calorie = data;
        return calorie;
      });
  }

  // fetch('https://jsonplaceholder.typicode.com/users')
  //   .then(response => response.json())
  //   .then(data => this.setState({ users: data, isLoading: false }));

  render() {
    return this.state.isLoading
      ? <div className='container'>
        <div className='row d-flex justify-content-center'>
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
      : <Drag users={this.state.users} />;
  }
}
