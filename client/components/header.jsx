import React from 'react';
export default function Header(props) {
  return (
<>
      <div className='container-lg'>
         <div className='d-flex justify-content-center mr-5'>
            <img className='mt-1 mr-2'src="./images/ox.png" alt="test" style={{ width: '130px' }} />
            <h2 className='mt-5 mr-5'>{props.header}</h2>
          </div>
      </div>
</>
  );
}
