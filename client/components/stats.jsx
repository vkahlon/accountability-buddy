import React from 'react';
export default class Stats extends React.Component {
  render() {
    let statement = null;
    const dailyCalories = this.props.stats.results.dailyCalorie;
    const itemCalories = this.props.stats.results.calories;
    let itemName = null;
    let itemIcon = null;
    if (this.props.stats.results.exerciseName !== undefined) {
      itemName = this.props.stats.results.exerciseName;
      itemIcon = 'fa-solid fa-dumbbell';
    } else {
      itemName = this.props.stats.results.mealName;
      itemIcon = 'fa-solid fa-utensils';
    }
    if (this.props.purpose === 'item') {
      return (
        <div className="container">
          <div className="row d-flex justify-content-center mt-2">
            <div className="d-flex justify-content-center">
              <i style={{ fontSize: '4rem', color: 'rgb(24,49,83)' }} className={itemIcon}></i>
            </div>
          </div>
          <div className="row d-flex justify-content-center mt-2">
            <div className="col-8 d-flex justify-content-center">
              <h2>{itemName}</h2>
            </div>
            <div className="col-8 d-flex justify-content-center">
              <h3>{itemCalories} Calories</h3>
            </div>
          </div>
          <div className="row d-flex justify-content-center mt-4">
            <div className="col-8 d-flex justify-content-center col-lg-4">
              <a href="#">Return Home</a>
            </div>
          </div>
        </div>
      );
    }
    if (this.props.purpose === 'calculator') {
      statement = `With your goal of ${this.props.stats.goal}, and your ${this.props.stats.level} lifestyle. You will be consuming ${dailyCalories} calories per day in order to achieve your goal.`;
      return (
      <div className='container'>
        <div className='row d-flex justify-content-center mt-3'>
          <div className='col-10 d-flex justify-content-center col-lg-5 pt-2 pb-2' style={{ backgroundColor: '#FFF3CD', borderRadius: '25px' }}>
              <h2>{dailyCalories} Calories</h2>
          </div>
        </div>
        <div className='row d-flex justify-content-center mt-4'>
          <div className='col-10 d-flex justify-content-center col-lg-5'>
            <p>{statement} </p>
          </div>
        </div>
        <div className='row d-flex justify-content-center mt-4'>
          <div className='col-8 d-flex justify-content-center col-lg-4'>
            <a href="#">Return Home</a>
          </div>
        </div>
      </div>
      );
    }
  }
}
