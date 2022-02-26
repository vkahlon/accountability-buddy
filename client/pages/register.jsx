import React from 'react';
import Navbar from '../components/navbar';
import Auth from '../components/auth-form';
export default function Register(props) {
  return (
      <>
      <Navbar />
      <Auth purpose={'Register'} />
    </>
  );
}
