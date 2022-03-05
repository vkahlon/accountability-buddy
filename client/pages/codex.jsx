import React from 'react';
import Header from '../components/header';
import UserInfo from '../components/userInfo';
import Redirect from '../components/redirect';
import Navbar from '../components/navbar';
export default function Codex(props) {
  if (props.token === 'undefined') return <Redirect to="#sign-in" />;
  return (
    <>
      <Navbar token={props.token} />
      <Header header={'Fitness Codex'} />
      <UserInfo token={props.token}/>
    </>
  );
}
