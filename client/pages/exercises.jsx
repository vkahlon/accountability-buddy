import React from 'react';
import ItemForm from '../components/item-form';
import Redirect from '../components/redirect';
import Navbar from '../components/navbar';
export default function Exercises(props) {
  if (props.token === null) return <Redirect to="#sign-in" />;
  return (
    <>
      <Navbar onSignOut={props.out} token={props.token} />
      <ItemForm token={props.token} purpose={'Exercise'} status={'Add an Exercise'} />
    </>
  );
}
