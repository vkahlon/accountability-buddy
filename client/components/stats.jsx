import React from 'react';
export default class Navbar extends React.Component {

  render() {
    let statement = null;
    const calories = this.props.stats.results.dailyCalorie;
    if (this.props.purpose === 'calculator') {
      statement = `With your goal of ${this.props.stats.goal}, and your ${this.props.stats.level} lifestyle. You will be consuming ${calories} calories per day in order to achieve your goal.`;
    }
    return (
      <div className='container'>
        <div className='row d-flex justify-content-center mt-3'>
          <div className='col-10 d-flex justify-content-center col-lg-5 pt-2 pb-2' style={{ backgroundColor: '#FFF3CD', borderRadius: '25px' }}>
            <h2>{calories} Calories</h2>
          </div>
        </div>
        <div className='row d-flex justify-content-center mt-4'>
          <div className='col-10 d-flex justify-content-center col-lg-5'>
            <p>{statement} </p>
          </div>
        </div>
      </div>
    );
  }
}
