import React from 'react';
import Header from './header';
export default class IForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: '',
      calories: '',
      meal: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch('/api/calorie/add-meal', req)
      .then(res => res.json())
      .then(result => {
        this.setState({ results: result });
      });
  }

  render() {
    return (
      <>
      <Header header={'Add a Meal'}/>
        <div className='container '>
          <div className='row d-flex justify-content-center'>
            <div className='col-10 d-flex justify-content-center col-lg-8' style={{ backgroundColor: '#F5FCFF', borderRadius: '25px' }}>

        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="age">Meal Name</label>
            <input onChange={this.handleChange} type="text" className="form-control" required id="meal" name="meal" aria-describedby="AgeHelp" placeholder="Enter Meal Name" />
          </div>
          <div className="form-group">
            <label htmlFor="age">Total Calories</label>
            <input onChange={this.handleChange} type="number" className="form-control" required id="calories" name="calories" aria-describedby="AgeHelp" placeholder="Enter Meal Calories" />
          </div>
          <div className="form-group d-flex justify-content-center mr-3 pt-3">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}
