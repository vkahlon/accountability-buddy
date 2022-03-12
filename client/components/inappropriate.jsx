import React from 'react';
export default function Inappropriate(props) {
  return (
    <>
      <div className='d-flex justify-content-center'>
        <div className='col-10 col-lg-6'>
          <div className="alert alert-warning alert-dismissible fade show" role="alert">
            <h3 className='text-center ml-4'>Inappropriate Input!</h3>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
