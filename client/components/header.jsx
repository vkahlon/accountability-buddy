import React from 'react';
export default function Header(props) {
  return (
<>
      <div className='container-lg'>
        <div className='row'>
          <div className='col-5 col-lg-5 d-flex justify-content-end'>
            <img src="./images/ox1.png" alt="test" style={{ width: '150px' }} />
          </div>
          <div className='col-6 col-lg-6'>
            <h1 style={{ paddingTop: '4rem' }}>{props.header}</h1>
          </div>
        </div>
      </div>
</>
  );
}
