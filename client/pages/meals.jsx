import React from 'react';
import ItemForm from '../components/item-form';
import Redirect from '../components/redirect';
export default function Meals(props) {
  if (props.token === 'undefined') return <Redirect to="#sign-in" />;
  return (
    <>
      <ItemForm token={props.token} purpose={'Meal'} status={'Add a Meal'} />
    </>
  );
}
