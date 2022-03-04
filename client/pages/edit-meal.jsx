import React from 'react';
import EditItem from '../components/edit-item';
import Redirect from '../components/redirect';
export default function EditMeal(props) {
  if (!props.user) return <Redirect to="#sign-in" />;
  return (
    <>
      <EditItem purpose={'Meal'} status={'Edit Meals'}/>
    </>
  );
}
