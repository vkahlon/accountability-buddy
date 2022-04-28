import React from 'react';
export default function EditStats(props) {
  const itemCalories = props.stats.calories;
  let itemIcon = null;
  let itemName = null;
  if (props.purpose === 'Meal') {
    itemName = props.stats.mealName;
    itemIcon = 'fa-solid fa-utensils';
  } else {
    itemName = props.stats.exerciseName;
    itemIcon = 'fa-solid fa-dumbbell';
  }
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
