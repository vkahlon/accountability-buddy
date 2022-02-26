import React from 'react';
import Header from './header';
import Loading from './loading';
export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      results: '',
      password: '',
      userName: ''
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
    fetch(`/api/auth/${action}`, req)
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
          <Header header={'Account Created'} />
        </>
      );
    }

    const usernameLength = this.state.userName.length;
    const passwordLength = this.state.password.length;
    let warningPassword = null;
    let warningUsername = null;
    if (usernameLength > 15) {
      warningUsername = <p className='text-danger'>Reached Character Limit</p>;
    }
    if ((passwordLength > 0 && passwordLength < 8)) {
      warningPassword = <p className='text-danger'>Must be 8 characters</p>;
    }
    return (
      <>
        <Header header={this.props.purpose} />
        <div className='container '>
          <div className='row d-flex justify-content-center'>
            <div className='col-10 d-flex justify-content-center col-lg-8' style={{ backgroundColor: '#F5FCFF', borderRadius: '25px' }}>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group mt-3">
                  <label htmlFor="name">Username</label>
                  <input onChange={this.handleChange} type="text" className="form-control" maxLength={16} required id="userName" name="userName" aria-describedby="AgeHelp" placeholder="Enter Username" />
                </div>
                <div>{warningUsername}</div>
                <div className="form-group">
                  <label htmlFor="password">Enter Password</label>
                  <input onChange={this.handleChange} type="password" className="form-control" minLength={8} required id="password" name="password" aria-describedby="AgeHelp" placeholder="Enter Password" />
                </div>
                <div>{warningPassword}</div>
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
