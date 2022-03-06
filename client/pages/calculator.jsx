import React from 'react';
import CalorieForm from '../components/calorie-form';
import Redirect from '../components/redirect';
import Navbar from '../components/navbar';
export default function Calculator(props) {
  if (props.token === null) return <Redirect to="#sign-in" />;
  return (
    <>
      <Navbar onSignOut={props.out} token={props.token}/>
      <CalorieForm token={props.token} />
    </>
  );
}
