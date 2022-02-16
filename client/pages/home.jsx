import React from 'react';
import Navbar from '../components/navbar';
export default function Home(props) {
  return (
    <>
    <Navbar />
    <div className='container-lg'>
        <div className='row'>
        <div className='col-5 col-lg-5 d-flex justify-content-end'>
          <img src="./images/ox1.png" alt="test" style={{ width: '150px' }} />
      </div>
      <div className='col-6 col-lg-6'>
            <h2 style={{ paddingTop: '1.4rem' }}>Welcome!</h2>
            <h4>To Version: Priorty 1</h4>
            <span className='pt-20'>Click a tab from the Navbar to Begin</span>
          </div>
        </div>
    </div>
    </>
  );
}
