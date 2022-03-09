import React from 'react';
import Header from './header';
import Loading from './loading';
import Redirect from './redirect';
import Error from './error-message';
export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      results: '',
      password: '',
      userName: '',
      error: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(guest, fakePassword) {
    this.setState({ loading: true });
    const guestInfo = {
      loading: false,
      results: '',
      password: fakePassword,
      userName: guest
    };
    const action = this.props.purpose;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(guestInfo)
    };
    fetch(`/api/auth/${action}`, req)
      .then(res => res.json())
      .then(result => {
        this.setState({ results: result, loading: false });
        if (result.user && result.token) {
          this.props.onSignIn(result);
        }
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    this.setState({ loading: true });
    const action = this.props.purpose;
    if (event !== undefined) event.preventDefault();
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
        if ((result.error) && (action === 'Sign-In')) {
          return this.setState({ loading: false, password: '', userName: '', error: true });
        }
        this.setState({ results: result, loading: false, error: false });
        if (result.user && result.token) {
          this.props.onSignIn(result);
        }
      });
  }

  render() {
    if (this.state.results.error === 'an unexpected error occurred') {
      return (
        <>
          <Header header={'We are Sorry!'} />
          <Error />
        </>
      );
    }
    let guest = null;
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
    if (this.props.purpose === 'Sign-In') {
      warningPassword = null;
      guest = <div className="row d-flex justify-content-center mt-4">
        <div className="col-8 d-flex justify-content-center col-lg-4">
          <a onClick={() => { this.handleClick('Guest', 'password'); }} className="mr-3 text-primary" style={{ cursor: 'pointer' }}>Sign-In as Guest</a>
        </div>
      </div>;
    }
    if (this.state.loading === true) {
      return (
        <>
          <Header header={'Loading'} />
          < Loading />
        </>
      );
    }
    if (this.state.results.purpose === 'Register') {
      return (
        <>
          <Header header={'Account Created'} />
          <div className="row d-flex justify-content-center mt-4">
            <div className="col-8 d-flex justify-content-center col-lg-4">
              <a href="#">Return Home</a>
            </div>
          </div>
        </>
      );
    }
    if (this.state.results.token !== undefined) {
      return (
        <>
          < Redirect to='#'/>
          {window.location.reload()}
        </>
      );
    }
    let invalidWarning = null;
    if (this.state.error) {
      invalidWarning = <div className="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Invalid Login!</strong> Please Try Again.
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>;
    }
    return (
      <>
        <Header header={this.props.purpose} />
        <div className='container '>
          <div className='row d-flex justify-content-center'>
            <div className='col-10 d-flex justify-content-center col-lg-8'>
            {invalidWarning}
            </div>
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
        {guest}
      </>
    );
  }
}
