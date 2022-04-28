import React, { useState } from 'react';
import Header from './header';
import Loading from './loading';
import Redirect from './redirect';
import Error from './error-message';
import Inappropriate from './inappropriate';
import BannedWords from 'profane-words';
export default function AuthForm(props) {
  const [invalid, setInvalid] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const guestSignIn = event => {
    setLoading(true);
    const guestInfo = {
      loading: false,
      results: '',
      password: 'password1',
      userName: 'Guest'
    };
    const action = props.purpose;
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
        setResults(result);
        setLoading(false);
        if (result.user && result.token) {
          props.onSignIn(result);
        }
      });
  };

  const submit = event => {
    if (event !== undefined) event.preventDefault();
    setLoading(true);
    const nameCheck = userName;
    if (BannedWords.includes(nameCheck.toLowerCase())) {
      setLoading(false);
      return setInvalid(true);
    }
    const action = props.purpose;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userName: userName, password: password })
    };
    fetch(`/api/auth/${action}`, req)
      .then(res => res.json())
      .then(result => {
        if ((result.error) && (action === 'Sign-In')) {
          setLoading(false);
          setPassword('');
          setUserName('');
          setError(true);
          return setInvalid(false);
        }
        setLoading(false);
        setResults(result);
        setError(false);
        if (result.user && result.token) {
          props.onSignIn(result);
        }
      });
  };

  if (results.error === 'an unexpected error occurred') {
    return (
        <>
          <Header header={'We are Sorry!'} />
          <Error />
        </>
    );
  }
  let guest = null;
  const usernameLength = userName.length;
  const passwordLength = password.length;
  let warningPassword = null;
  let warningUsername = null;
  if (usernameLength > 15) {
    warningUsername = <p className='text-danger'>Reached Character Limit</p>;
  }
  if ((passwordLength > 0 && passwordLength < 8)) {
    warningPassword = <p className='text-danger'>Must be 8 characters</p>;
  }
  if (props.purpose === 'Sign-In') {
    warningPassword = null;
    guest = <div className="row d-flex justify-content-center mt-4">
        <div className="col-8 d-flex justify-content-center col-lg-4">
          <a onClick={guestSignIn} className="mr-3 text-primary" style={{ cursor: 'pointer' }}>Sign-In as Guest</a>
        </div>
      </div>;
  }
  if (loading === true) {
    return (
        <>
          <Header header={'Loading'} />
          < Loading />
        </>
    );
  }
  if (results.purpose === 'Register') {
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
  if (results.token !== undefined) {
    return (
        <>
          < Redirect to='#'/>
          {window.location.reload()}
        </>
    );
  }
  let invalidWarning = null;
  if (error) {
    invalidWarning = <div className="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Invalid Login!</strong> Please Try Again.
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>;
  }
  if (invalid) {
    invalidWarning = <Inappropriate />;
  }
  return (
      <>
        <Header header={props.purpose} />
        <div className='container '>
          <div className='row d-flex justify-content-center'>
            <div className='col-10 d-flex justify-content-center col-lg-8'>
            {invalidWarning}
            </div>
            <div className='col-10 d-flex justify-content-center col-lg-8' style={{ backgroundColor: '#F5FCFF', borderRadius: '25px' }}>
              <form onSubmit={submit}>
                <div className="form-group mt-3">
                  <label htmlFor="name">Username</label>
                <input onChange={e => setUserName(e.target.value)} type="text" className="form-control" maxLength={16} required id="userName" name="userName" aria-describedby="AgeHelp" placeholder="Enter Username" />
                </div>
                <div>{warningUsername}</div>
                <div className="form-group">
                  <label htmlFor="password">Enter Password</label>
                <input onChange={e => setPassword(e.target.value)} type="password" className="form-control" minLength={8} required id="password" name="password" aria-describedby="AgeHelp" placeholder="Enter Password" />
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
