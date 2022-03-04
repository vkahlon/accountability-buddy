import React from 'react';
import CalorieForm from '../components/calorie-form';
import Redirect from '../components/redirect';
import Navbar from '../components/navbar';
export default function Calculator(props) {
  if (props.user === 'undefined') return <Redirect to="#sign-in" />;
  return (
    <>
      <Navbar userId={props.user.userId}/>
      <CalorieForm userId={props.user.userId} />
    </>
  );
}
