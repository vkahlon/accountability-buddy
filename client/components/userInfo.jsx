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
    /* your code here */
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => this.setState({ users: data, isLoading: false }));
  }

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
