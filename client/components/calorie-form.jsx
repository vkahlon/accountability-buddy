import React from 'react';
export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unit: 'freedom'
    };
  }

  render() {
    return (
      <div className='container-lg '>
        <div className='row d-flex justify-content-center'>
          <div className='col-10 d-flex justify-content-center col-lg-9' style={{ backgroundColor: '#F5FCFF' }}>
          <form onSubmit={this.handleSubmit}>
            <label>Age
              <input type="email" value={this.state.email} onChange={this.handleChange} />
            </label>
          </form>
          </div>
        </div>
      </div>
    );
  }
}
