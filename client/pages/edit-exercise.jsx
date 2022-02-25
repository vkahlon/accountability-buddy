import React from 'react';
import Navbar from '../components/navbar';
import EditItem from '../components/edit-item';
export default function EditExercise(props) {
  return (
    <>
      <Navbar />
      <EditItem purpose={'Exercise'} status={'Edit Exercises'} />
    </>
  );
}
