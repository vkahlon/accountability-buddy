import React from 'react';
import ItemForm from '../components/item-form';
import Redirect from '../components/redirect';
export default function Exercises(props) {
  if (props.token === null) return <Redirect to="#sign-in" />;
  return (
    <>
      <ItemForm token={props.token} purpose={'Exercise'} status={'Add an Exercise'} />
    </>
  );
}
