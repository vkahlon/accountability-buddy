import React from 'react';
import Header from '../components/header';
import UserInfo from '../components/userInfo';
import Redirect from '../components/redirect';
import Navbar from '../components/navbar';
export default function Codex(props) {
  if (props.user === 'undefined') return <Redirect to="#sign-in" />;
  return (
    <>
      <Navbar userId={props.user.userId} />
      <Header header={'Fitness Codex'} />
      <UserInfo userId={props.user.userId}/>
    </>
  );
}
