import React from 'react';
export default function Home(props) {
  return (
    <>
    <div className='container-lg'>
        <div className='row'>
        <div className='col-5 col-lg-5 d-flex justify-content-end'>
          <img src="./images/ox.png" alt="test" style={{ width: '150px' }} />
      </div>
      <div className='col-6 col-lg-6'>
            <h2 className="mt-4">Welcome!</h2>
            <h4>To Version: Priorty 2</h4>
            <span>Click a tab from the Navbar to Begin</span>
          </div>
        </div>
    </div>
    </>
  );
}
