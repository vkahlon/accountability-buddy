import React from 'react';
import Navbar from '../components/navbar';
import Header from '../components/header';
export default function NotFound(props) {
  return (
    <>
      <Navbar />
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
