import React from 'react';
import Header from '../components/header';
import Navbar from '../components/navbar';
export default function NotFound(props) {
  let navDefault;
  if (typeof props.user.userId !== 'undefined') navDefault = props.user.userId;
  return (
    <>
      <Navbar userId={navDefault} />
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
