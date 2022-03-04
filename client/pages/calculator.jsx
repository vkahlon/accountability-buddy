import React from 'react';
import CalorieForm from '../components/calorie-form';
import Redirect from '../components/redirect';
export default function Calculator(props) {
  if (!props.user) return <Redirect to="#sign-in" />;
  return (
    <>
      <CalorieForm userId={props.user.userId} />
    </>
  );
}
