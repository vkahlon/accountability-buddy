import React from 'react';
import EditStats from './edit-stats';
import Header from './header';
import EditItem from './edit-item';
import Loading from './loading';
import BannedWords from 'profane-words';
export default class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 0,
      calories: '',
      results: '',
      item: '',
      loading: false,
      invalid: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    if (event !== undefined) event.preventDefault();
    this.setState({ loading: true });
    const nameCheck = this.state.item;
    if (BannedWords.includes(nameCheck.toLowerCase())) {
      return this.setState({ loading: false, invalid: true });
    }
    const action = this.props.purpose;
    const id = this.props.item.id;
    const req = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': `${this.props.token}`
      },
      body: JSON.stringify(this.state)
    };
    fetch(`/api/calorie/edit-${action}/${id}`, req)
      .then(res => res.json())
      .then(data => {
        this.setState({ results: data, stage: 1, loading: false, invalid: false });
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
    if (this.state.stage === 1) {
      return (
        <>
          <Header header={`${this.props.purpose} Changed`} />
          < EditStats stats={this.state.results} purpose={this.props.purpose} />
        </>
      );
    }
    if (this.state.stage === 2) {
      return (
        <>
          <EditItem token={this.props.token} user={this.props.user} purpose={this.props.purpose} status={`${this.props.status}s`} />
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
    if (this.state.invalid) {
      warningMeal = <p className='text-warning'>Inappropriate Input</p>;
    }
    return (
      <>
        <Header header={this.props.status} />
        <div className='container '>
          <div className='row d-flex justify-content-center'>
            <div className='col-10 d-flex justify-content-center col-lg-8' style={{ backgroundColor: '#F5FCFF', borderRadius: '25px' }}>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group mt-3">
                  <label htmlFor="name">Edit {this.props.purpose} Name</label>
                  <input onChange={this.handleChange} type="text" className="form-control" maxLength={15} required id="item" name="item" aria-describedby="AgeHelp" placeholder={this.props.item.content} />
                </div>
                <div>{warningMeal}</div>
                <div className="form-group">
                  <label htmlFor="calories">Edit Total Calories</label>
                  <input onChange={this.handleChange} type="number" className="form-control" max={9999} required id="calories" name="calories" aria-describedby="AgeHelp" placeholder={this.props.item.calories} />
                </div>
                <div>{warningCal}</div>
                <div className="form-group d-flex justify-content-around mt-2">
                  <button type="submit" className="btn btn-primary mr-3">Submit</button>
                </div>
              </form>
            </div>
          </div>
          <div className='row d-flex justify-content-center'>
            <button onClick={() => { this.setState({ stage: 2 }); }} className="btn btn-link mt-3 mr-3">Go Back</button>
          </div>
        </div>
      </>
    );
  }
}
