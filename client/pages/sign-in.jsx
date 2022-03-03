import React from 'react';
import Navbar from '../components/navbar';
import Auth from '../components/auth-form';
export default function SignIn(props) {
  return (
    <>
      <Navbar />
      <Auth purpose={'Sign-In'} />
    </>
  );
}
