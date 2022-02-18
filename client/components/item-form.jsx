import React from 'react';
import Header from './header';
export default class IForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: '',
      goal: '',
      level: ''
    };
  }

  render() {
    return (
      <>
      <Header header={'Add a Meal'}/>
        <div className='container '>
          <div className='row d-flex justify-content-center'>
            <div className='col-10 d-flex justify-content-center col-lg-9' style={{ backgroundColor: '#F5FCFF', borderRadius: '25px' }}>
            </div>
          </div>
        </div>
        <form onSubmit={this.handleSubmit}></form>
      </>
    );
  }
}
