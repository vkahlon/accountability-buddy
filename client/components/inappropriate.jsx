import React from 'react';
export default function Inappropriate(props) {
  return (
    <>
      <div className='d-flex justify-content-center'>
        <div className='col-10 col-lg-12'>
          <div className="alert alert-warning alert-dismissible fade show" role="alert">
            <h6>Inappropriate Name!</h6>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
