import React from 'react';
export default function Stats(props) {
  let statement = null;
  let itemName = null;
  let itemIcon = null;
  if (props.purpose === 'calculator') {
    const dailyCalories = props.stats.result;
    statement = `With your goal of ${props.stats.goal}, and your ${props.stats.level} lifestyle. You will be consuming ${dailyCalories} calories per day in order to achieve your goal.`;
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
  const itemCalories = props.stats.results.calories;

  if (props.stats.results.exerciseName !== undefined) {
    itemName = props.stats.results.exerciseName;
    itemIcon = 'fa-solid fa-dumbbell';
  } else {
    itemName = props.stats.results.mealName;
    itemIcon = 'fa-solid fa-utensils';
  }
  if (props.purpose === 'item') {
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
}
