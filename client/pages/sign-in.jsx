import React from 'react';
import Auth from '../components/auth-form';
import Navbar from '../components/navbar';
export default function SignIn(props) {
  let navDefault;
  if (typeof props.token !== 'undefined') navDefault = props.token;
  return (
    <>
      <Navbar token={navDefault} />
      <Auth purpose={'Sign-In'} onSignIn={props.sign} />
    </>
  );
}
