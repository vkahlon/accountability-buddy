import React, { useState } from 'react';
import Stats from './stats';
import Header from './header';
import Error from './error-message';
import Loading from './loading';
export default function CalorieForm(props) {
  const [metric, setMetric] = useState(false);
  const [goal, setGoal] = useState('');
  const [level, setLevel] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [results, setResults] = useState('');
  const [loading, setLoading] = useState(false);

  const stats = event => {
    setLoading(true);
    const stats = { goal: goal, level: level, gender: gender, weight: weight, height: height, age: age, metric: metric };
    event.preventDefault();
    const req = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': `${props.token}`
      },
      body: JSON.stringify(stats)
    };
    fetch('/api/calorie/get-calorie', req)
      .then(res => res.json())
      .then(result => {
        setResults({ result: result.dailyCalorie, goal: stats.goal, level: stats.level });
        setLoading(false);
      });
  };
  if (loading === true) {
    return (
        <>
          <Header header={'Loading'} />
          < Loading />
        </>
    );
  }
  if (results.error === 'an unexpected error occurred') {
    return (
        <>
          <Header header={'We are Sorry!'} />
          <Error />
        </>
    );
  }
  const whichUnit = metric;
  let scaleAlpha;
  let scaleBeta;
  if (whichUnit === false) {
    scaleAlpha = <>
      <input onChange={e => setWeight(e.target.value)} type="number" required className="form-control" name="weight" id="weight" aria-describedby="weightHelp" placeholder="Enter Weight in lbs" />
                  <small id="weightHelp" className="form-text text-muted">Current Unit: Imperial-Pounds</small>
                  </>;
    scaleBeta = <>
      <input onChange={e => setHeight(e.target.value)} type="number" required className="form-control" name="height" id="height" aria-describedby="HeightHelp" placeholder="Enter Height in inches"/>
                  <small id="HeightHelp" className="form-text text-muted">Current Unit: Imperial-Inches</small>
                  </>;
  } else {
    scaleAlpha = <>
      <input onChange={e => setWeight(e.target.value)} type="number" required className="form-control" name="weight" id="weight" aria-describedby="weightHelp" placeholder="Enter Weight in kg" />
        <small id="weightHelp" className="form-text text-muted">Current Unit: Metric-Kilograms</small>
      </>;
    scaleBeta = <>
      <input onChange={e => setHeight(e.target.value)} type="number" required className="form-control" name="height" id="height" aria-describedby="HeightHelp" placeholder="Enter Height in cm" />
        <small id="HeightHelp" className="form-text text-muted">Current Unit: Metric-Cenimeters</small>
      </>;
  }
  if (results !== '') {
    return (
        <>
        <Header header={'Your Stats'} />
        < Stats stats={results} purpose={'calculator'}/>
        </>
    );
  }
  return (
      <>
      <Header header={'Calculate Calories'} />
      <div className='container '>
        <div className='row d-flex justify-content-center'>
            <div className='col-10 d-flex justify-content-center col-lg-9' style={{ backgroundColor: '#F5FCFF', borderRadius: '25px' } }>
            <form onSubmit={stats}>
              <div className="custom-control custom-switch  pt-4 pb-4">
                <input onChange={e => setMetric(!metric)} type="checkbox" className="custom-control-input" id="customSwitch1" name="metric" />
                <label style={{ cursor: 'pointer' }} className="custom-control-label" htmlFor="customSwitch1">Enable Metric Units</label>
              </div>
              <div className="form-group">
                <label htmlFor="goal">Goal</label>
                <select style={{ cursor: 'pointer' }} onChange={e => setGoal(e.target.value)} className="form-control" required id="goal" name="goal" defaultValue="">
                  <option value="" disabled>Select a Goal</option>
                  <option>Cutting</option>
                  <option>Maintainence</option>
                  <option>Bulking</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="level">Activity Level</label>
                <select style={{ cursor: 'pointer' }} onChange={e => setLevel(e.target.value)} className="form-control" required id="level" name="level" defaultValue="">
                  <option value="" disabled>Select Activity Level</option>
                  <option>Sedentary</option>
                  <option>Lightly Active</option>
                  <option>Moderately Active</option>
                  <option>Very Active</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select style={{ cursor: 'pointer' }} onChange={e => setGender(e.target.value)} className="form-control" required id="gender" name="gender" defaultValue="">
                  <option value="" disabled>Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="InputWeight">Weight</label>
                {scaleAlpha}
              </div>
              <div className="form-group">
                <label htmlFor="InputHeight">Height</label>
                {scaleBeta}
              </div>
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input onChange={e => setAge(e.target.value)} type="number" className="form-control" required id="age" name="age" aria-describedby="AgeHelp" placeholder="Enter Age"/>
              </div>
              <div className="form-group d-flex justify-content-center mr-3 pt-3">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
          </form>
          </div>
        </div>
      </div>
      </>
  );
}
