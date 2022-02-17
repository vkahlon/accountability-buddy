import React from 'react';
export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: this.props.stats
    };
  }

  render() {
    let statement = null;
    const calories = this.state.stats.results.dailyCalorie;
    if (this.props.purpose === 'calculator') {
      statement = `With your goal of ${this.state.stats.goal}, and your ${this.state.stats.level} activity level. You will be consuming ${calories} calories per day.`;
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
