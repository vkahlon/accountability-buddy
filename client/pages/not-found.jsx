import React from 'react';
import Header from '../components/header';
import Navbar from '../components/navbar';
export default function NotFound(props) {
  let navDefault;
  if (props.token !== 'undefined') navDefault = props.token;
  return (
    <>
      <Navbar onSignOut={props.out} token={navDefault} />
      <Header header={'Woops! Wrong Page!'} />
      <div className="row">
        <div className="col text-center mb-5">
          <p className="text-muted">
            <a href="#">Return Home</a>
          </p>
        </div>
      </div>
    </>
  );
}
