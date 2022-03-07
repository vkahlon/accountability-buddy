import React from 'react';
import Header from '../components/header';
import UserInfo from '../components/userInfo';
import Redirect from '../components/redirect';
export default function Codex(props) {
  if (props.token === null) return <Redirect to="#sign-in" />;
  return (
    <>
      <Header header={'Fitness Codex'} />
      <UserInfo token={props.token}/>
    </>
  );
}
