import React from 'react';
import Navbar from '../components/navbar';
import Header from '../components/header';
export default function NotFound(props) {
  return (
    <>
      <Navbar />
      <Header header={'Woops! Wrong Page!'} />
    </>
  );
}