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
      <div className='container '>
        <div className='row d-flex justify-content-center'>
          <div className='col-10 d-flex justify-content-center col-lg-9' style={{ backgroundColor: '#F5FCFF' }}>
          <form onSubmit={this.handleSubmit}>
              <div className="custom-control custom-switch  pt-4 pb-4">
                <input type="checkbox" className="custom-control-input" id="customSwitch1"/>
                  <label className="custom-control-label" htmlFor="customSwitch1">Enable Imperial Units</label>
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Goal</label>
                <select className="form-control" id="exampleFormControlSelect1" defaultValue="">
                  <option value="" disabled>Select a Goal</option>
                  <option>Cut</option>
                  <option>Maintain</option>
                  <option>Bulk</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Activity Level</label>
                <select className="form-control" id="exampleFormControlSelect1" defaultValue="">
                  <option value="" disabled>Select Activity Level</option>
                  <option>Sedentary</option>
                  <option>Lightly Active</option>
                  <option>Moderately Active</option>
                  <option>Very Active</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Gender</label>
                <select className="form-control" id="exampleFormControlSelect1" defaultValue="">
                  <option value="" disabled>Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="InputWeight">Weight</label>
                <input type="number" className="form-control" id="inputWeight" aria-describedby="weightHelp" placeholder="Enter Weight"/>
                <small id="weightHelp" className="form-text text-muted">Currently Selected Metric</small>
              </div>
              <div className="form-group">
                <label htmlFor="InputHeight">Height</label>
                <input type="number" className="form-control" id="inputHeight" aria-describedby="HeightHelp" placeholder="Enter Height"/>
                <small id="HeightHelp" className="form-text text-muted">Currently Selected Metric</small>
              </div>
              <div className="form-group">
                <label htmlFor="InputAge">Age</label>
                <input type="number" className="form-control" id="inputAge" aria-describedby="AgeHelp" placeholder="Enter Age"/>
              </div>
              <div className="form-group d-flex justify-content-center mr-3 pt-3">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
          </form>
          </div>
        </div>
      </div>
    );
  }
}
