import React from 'react';
export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      metric: false,
      goal: '',
      level: '',
      gender: '',
      weight: '',
      height: '',
      age: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    if (name === 'metric') {
      return this.setState({ metric: (!this.state.metric) });
    }
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const req = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch('/api/calorie/get-calorie', req)
      .then(res => res.json())
      .then(result => {
      });
  }

  render() {
    const whichUnit = this.state.metric;
    let scaleAlpha;
    let scaleBeta;
    if (whichUnit === false) {
      scaleAlpha = <>
                  <input onChange={this.handleChange} type="number" required className="form-control" name="weight" id="weight" aria-describedby="weightHelp" placeholder="Enter Weight in lbs" />
                  <small id="weightHelp" className="form-text text-muted">Current Unit: Imperial-Pounds</small>
                  </>;
      scaleBeta = <>
                  <input onChange={this.handleChange} type="number" required className="form-control" name="height" id="height" aria-describedby="HeightHelp" placeholder="Enter Height in inches"/>
                  <small id="HeightHelp" className="form-text text-muted">Current Unit: Imperial-Inches</small>
                  </>;
    } else {
      scaleAlpha = <>
        <input onChange={this.handleChange} type="number" required className="form-control" name="weight" id="weight" aria-describedby="weightHelp" placeholder="Enter Weight in kg" />
        <small id="weightHelp" className="form-text text-muted">Current Unit: Metric-Kilograms</small>
      </>;
      scaleBeta = <>
        <input onChange={this.handleChange} type="number" required className="form-control" name="height" id="height" aria-describedby="HeightHelp" placeholder="Enter Height in cm" />
        <small id="HeightHelp" className="form-text text-muted">Current Unit: Metric-Cenimeters</small>
      </>;
    }
    return (
      <div className='container '>
        <div className='row d-flex justify-content-center'>
          <div className='col-10 d-flex justify-content-center col-lg-9' style={{ backgroundColor: '#F5FCFF' }}>
          <form onSubmit={this.handleSubmit}>
              <div className="custom-control custom-switch  pt-4 pb-4">
                <input onChange={this.handleChange} type="checkbox" className="custom-control-input" id="customSwitch1" name="metric" />
                <label className="custom-control-label" htmlFor="customSwitch1">Enable Metric Units</label>
              </div>
              <div className="form-group">
                <label htmlFor="goal">Goal</label>
                <select onChange={this.handleChange} className="form-control" required id="goal" name="goal" defaultValue="">
                  <option value="" disabled>Select a Goal</option>
                  <option>Cut</option>
                  <option>Maintain</option>
                  <option>Bulk</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="level">Activity Level</label>
                <select onChange={this.handleChange} className="form-control" required id="level" name="level" defaultValue="">
                  <option value="" disabled>Select Activity Level</option>
                  <option>Sedentary</option>
                  <option>Lightly Active</option>
                  <option>Moderately Active</option>
                  <option>Very Active</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select onChange={this.handleChange} className="form-control" required id="gender" name="gender" defaultValue="">
                  <option value="" disabled>Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="InputWeight">Weight</label>
                {scaleAlpha}
              </div>
              <div className="form-group">
                <label htmlFor="InputHeight">Height</label>
                {scaleBeta}
              </div>
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input onChange={this.handleChange} type="number" className="form-control" required id="age" name="age" aria-describedby="AgeHelp" placeholder="Enter Age"/>
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
