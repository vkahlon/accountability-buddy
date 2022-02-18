import React from 'react';
import Navbar from '../components/navbar';
import ItemForm from '../components/item-form';
export default function Meals(props) {
  return (
    <>
      <Navbar />
      <ItemForm status={''} />
    </>
  );
}
