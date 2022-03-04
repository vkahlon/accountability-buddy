import React from 'react';
import Header from '../components/header';
import UserInfo from '../components/userInfo';
import Redirect from '../components/redirect';
export default function Codex(props) {
  if (!props.user) return <Redirect to="#sign-in" />;
  return (
    <>
      <Header header={'Fitness Codex'} />
      <UserInfo userId={props.user.userId}/>
    </>
  );
}
