import React from 'react';
import ItemForm from '../components/item-form';
import Redirect from '../components/redirect';
import Navbar from '../components/navbar';
export default function Exercises(props) {
  if (props.user === 'undefined') return <Redirect to="#sign-in" />;
  return (
    <>
      <Navbar userId={props.user.userId} />
      <ItemForm token={props.token} user={props.user} purpose={'Exercise'} status={'Add an Exercise'} />
    </>
  );
}
