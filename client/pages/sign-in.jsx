import React from 'react';
import Auth from '../components/auth-form';
import Navbar from '../components/navbar';
export default function SignIn(props) {
  let navDefault;
  if (typeof props.user.userId !== 'undefined') navDefault = props.user.userId;
  return (
    <>
      <Navbar userId={navDefault} />
      <Auth purpose={'Sign-In'} onSignIn={props.sign} />
    </>
  );
}
