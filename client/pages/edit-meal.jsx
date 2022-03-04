import React from 'react';
import EditItem from '../components/edit-item';
import Redirect from '../components/redirect';
import Navbar from '../components/navbar';
export default function EditMeal(props) {
  if (props.user === 'undefined') return <Redirect to="#sign-in" />;
  return (
    <>
      <Navbar userId={props.user.userId} />
      <EditItem userId={props.user.userId} purpose={'Meal'} status={'Edit Meals'}/>
    </>
  );
}
