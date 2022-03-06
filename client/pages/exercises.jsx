import React from 'react';
import ItemForm from '../components/item-form';
import Redirect from '../components/redirect';
import Navbar from '../components/navbar';
export default function Exercises(props) {
  if (props.user === 'token') return <Redirect to="#sign-in" />;
  return (
    <>
      <Navbar token={props.token} />
      <ItemForm token={props.token} purpose={'Exercise'} status={'Add an Exercise'} />
    </>
  );
}
