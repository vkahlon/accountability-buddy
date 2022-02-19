import React from 'react';
import Navbar from '../components/navbar';
import ItemForm from '../components/item-form';
export default function Exercises(props) {
  return (
    <>
      <Navbar />
      <ItemForm purpose={'Exercise'} status={'Add an Exercise'} />
    </>
  );
}
