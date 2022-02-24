import React from 'react';
import Navbar from '../components/navbar';
import EditItem from '../components/edit-item';
export default function EditMeal(props) {
  return (
    <>
      <Navbar />
      <EditItem purpose={'Meal'} status={'Edit a Meal'}/>
    </>
  );
}
