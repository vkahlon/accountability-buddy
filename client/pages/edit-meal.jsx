import React from 'react';
import EditItem from '../components/edit-item';
import Redirect from '../components/redirect';
import Navbar from '../components/navbar';
export default function EditMeal(props) {
  if (props.token === 'undefined') return <Redirect to="#sign-in" />;
  return (
    <>
      <Navbar token={props.token} />
      <EditItem token={props.token} purpose={'Meal'} status={'Edit Meals'}/>
    </>
  );
}
