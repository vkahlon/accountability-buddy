import React from 'react';
import Stats from './stats';
import Header from './header';
import Loading from './loading';
export default class ItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      results: '',
      calories: '',
      item: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    this.setState({ loading: true });
    const action = this.props.purpose;
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch(`/api/calorie/add-${action}`, req)
      .then(res => res.json())
      .then(result => {
        this.setState({ results: result, loading: false });
      });
  }

  render() {
    if (this.state.loading === true) {
      return (
        <>
          <Header header={'Loading'} />
          < Loading />
        </>
      );
    }
    if (this.state.results !== '') {
      return (
        <>
          <Header header={`${this.props.purpose} Added`} />
          < Stats stats={this.state} purpose={'item'} />
        </>
      );
    }
    const itemLength = this.state.item.length;
    const calorieLength = this.state.calories.length;
    let warningCal = null;
    let warningMeal = null;
    if (itemLength > 14) {
      warningMeal = <p className='text-danger'>Reached Character Limit</p>;
    }
    if (calorieLength === 4) {
      warningCal = <p className='text-warning'>Reached Digit Limit</p>;
    }
    if (calorieLength > 4) {
      warningCal = <p className='text-danger'>Invalid Entry</p>;
    }
    return (
      <>
      <Header header={this.props.status}/>
        <div className='container '>
          <div className='row d-flex justify-content-center'>
            <div className='col-10 d-flex justify-content-center col-lg-8' style={{ backgroundColor: '#F5FCFF', borderRadius: '25px' }}>

        <form onSubmit={this.handleSubmit}>
          <div className="form-group mt-3">
            <label htmlFor="name">{this.props.purpose} Name</label>
                  <input onChange={this.handleChange} type="text" className="form-control" maxLength={15} required id="item" name="item" aria-describedby="AgeHelp" placeholder="Enter Name" />
          </div>
          <div>{warningMeal}</div>
          <div className="form-group">
            <label htmlFor="calories">Total Calories</label>
                  <input onChange={this.handleChange} type="number" className="form-control" max={9999} required id="calories" name="calories" aria-describedby="AgeHelp" placeholder="Enter Calories" />
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
