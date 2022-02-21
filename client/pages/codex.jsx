import React from 'react';
import Navbar from '../components/navbar';
import Header from '../components/header';
import UserInfo from '../components/userInfo';
export default function Codex(props) {
  return (
    <>
      <Navbar />
      <Header header={'Fitness Codex'} />
      <UserInfo/>
    </>
  );
}
