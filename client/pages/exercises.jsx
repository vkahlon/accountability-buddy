import React from 'react';
import ItemForm from '../components/item-form';
import Redirect from '../components/redirect';
export default function Exercises(props) {
  if (!props.user) return <Redirect to="#sign-in" />;
  return (
    <>
      <ItemForm userId={props.user.userId} purpose={'Exercise'} status={'Add an Exercise'} />
    </>
  );
}
