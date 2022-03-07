import React from 'react';
import EditItem from '../components/edit-item';
import Redirect from '../components/redirect';
export default function EditExercise(props) {
  if (props.token === null) return <Redirect to="#sign-in" />;
  return (
    <>
      <EditItem token={props.token} purpose={'Exercise'} status={'Edit Exercises'} />
    </>
  );
}
