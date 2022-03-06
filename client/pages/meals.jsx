import React from 'react';
import ItemForm from '../components/item-form';
import Redirect from '../components/redirect';
import Navbar from '../components/navbar';
export default function Meals(props) {
  if (props.token === 'undefined') return <Redirect to="#sign-in" />;
  return (
    <>
      <Navbar onSignOut={props.out} token={props.token} />
      <ItemForm token={props.token} purpose={'Meal'} status={'Add a Meal'} />
    </>
  );
}
