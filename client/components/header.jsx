import React from 'react';
export default function Header(props) {
  return (
<>
      <div className='container-lg'>
        <div className='row'>
          <div className='col-4 col-lg-5 d-flex justify-content-end'>
            <img src="./images/ox1.png" alt="test" style={{ width: '130px' }} />
          </div>
          <div className='col-8 col-lg-6'>
            <h2 className='mt-5'>{props.header}</h2>
          </div>
        </div>
      </div>
</>
  );
}
