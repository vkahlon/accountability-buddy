import React from 'react';
import Stats from './stats';
import Header from './header';
export default class IForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: this.props.status,
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
    if (this.state.results !== '') {
      return (
        <>
          <Header header={'Meal Added'} />
          < Stats stats={this.state} purpose={'meal'} />
        </>
      );
    }
    const mealLength = this.state.meal.length;
    const calorieLength = this.state.calories.length;
    let warningCal = null;
    let warningMeal = null;
    if (mealLength === 20) {
      warningMeal = <p className='text-danger'>Reched Character Limit</p>;
    }
    if (calorieLength > 3) {
      warningCal = <p className='text-danger'>Reached Digit Limit</p>;
    }
    return (
      <>
      <Header header={'Add a Meal'}/>
        <div className='container '>
          <div className='row d-flex justify-content-center'>
            <div className='col-10 d-flex justify-content-center col-lg-8' style={{ backgroundColor: '#F5FCFF', borderRadius: '25px' }}>

        <form onSubmit={this.handleSubmit}>
          <div className="form-group mt-3">
            <label htmlFor="name">Meal Name</label>
            <input onChange={this.handleChange} type="text" className="form-control" maxLength={20} required id="meal" name="meal" aria-describedby="AgeHelp" placeholder="Enter Meal Name" />
          </div>
          <div>{warningMeal}</div>
          <div className="form-group">
            <label htmlFor="calories">Total Calories</label>
                  <input onChange={this.handleChange} type="number" className="form-control" max={9999} required id="calories" name="calories" aria-describedby="AgeHelp" placeholder="Enter Meal Calories" />
          </div>
          <div>{warningCal}</div>
          <div className="form-group d-flex justify-content-center mr-3 mt-1">
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
