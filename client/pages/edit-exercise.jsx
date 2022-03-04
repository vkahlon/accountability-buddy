import React from 'react';
import EditItem from '../components/edit-item';
import Redirect from '../components/redirect';
export default function EditExercise(props) {
  if (!props.user) return <Redirect to="#sign-in" />;
  return (
    <>
      <EditItem userId={props.user.userId} purpose={'Exercise'} status={'Edit Exercises'} />
    </>
  );
}
