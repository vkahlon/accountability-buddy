import React from 'react';
import Navbar from '../components/navbar';
import Header from '../components/header';
export default function Calculator(props) {
  return (
    <>
      <Navbar />
      <Header header={'Calculate Calories'} />
    </>
  );
}
