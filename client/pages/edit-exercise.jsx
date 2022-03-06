import React from 'react';
import EditItem from '../components/edit-item';
import Redirect from '../components/redirect';
import Navbar from '../components/navbar';
export default function EditExercise(props) {
  if (props.token === 'undefined') return <Redirect to="#sign-in" />;
  return (
    <>
      <Navbar token={props.token} />
      <EditItem token={props.token} purpose={'Exercise'} status={'Edit Exercises'} />
    </>
  );
}
