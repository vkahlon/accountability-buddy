import React from 'react';
export default function Loading(props) {
  return (
    <>
        <div className='container'>
          <div className='row d-flex justify-content-center'>
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
    </>
  );
}
