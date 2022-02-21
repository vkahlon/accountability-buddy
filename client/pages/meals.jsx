import React from 'react';
import Navbar from '../components/navbar';
import ItemForm from '../components/item-form';
export default function Meals(props) {
  return (
    <>
      <Navbar />
      <ItemForm purpose={'Meal'} status={'Add a Meal'} />
    </>
  );
}
