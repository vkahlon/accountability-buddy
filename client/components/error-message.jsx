import React from 'react';
export default function Error(props) {
  return (
    <>
    <div className='d-flex justify-content-center'>
      <div className='col-10 col-lg-6'>
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Network Error:</strong> Please check your internet connection and try again. If the issue persists, please try again later..
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
      </div>
    </>
  );
}
