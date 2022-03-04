import React from 'react';
import Auth from '../components/auth-form';
import Navbar from '../components/navbar';
export default function Register(props) {
  let navDefault;
  if (typeof props.user.userId !== 'undefined') navDefault = props.user.userId;
  return (
    <>
      <Navbar userId={navDefault} />
      <Auth purpose={'Register'} />
    </>
  );
}
