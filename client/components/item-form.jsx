import React, { useState } from 'react';
import Stats from './stats';
import Header from './header';
import Loading from './loading';
import Error from './error-message';
import BannedWords from 'profane-words';
export default function ItemForm(props) {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState('');
  const [item, setItem] = useState('');
  const [calories, setCalories] = useState('');
  const [invalid, setInvalid] = useState(false);

  const postItem = event => {
    if (event !== undefined) event.preventDefault();
    setLoading(true);
    const nameCheck = item;
    if (BannedWords.includes(nameCheck.toLowerCase())) {
      setLoading(false);
      return setInvalid(true);
    }
    const action = props.purpose;
    const stats = { item: item, calories: calories };
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': `${props.token}`
      },
      body: JSON.stringify(stats),
      token: props.token
    };
    fetch(`/api/calorie/add-${action}`, req)
      .then(res => res.json())
      .then(result => {
        setResults(result);
        setInvalid(false);
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
  if (results !== '') {
    return (
        <>
          <Header header={`${props.purpose} Added`} />
        < Stats stats={results} purpose={'item'} />
        </>
    );
  }
  let invalidWarning;
  const itemLength = item.length;
  const calorieLength = calories.length;
  let warningCal = null;
  let warningMeal = null;
  if (itemLength > 14) {
    warningMeal = <p className='text-danger'>Reached Character Limit</p>;
  }
  if (calorieLength === 4) {
    warningCal = <p className='text-warning'>Reached Digit Limit</p>;
  }
  if (calorieLength > 4) {
    warningCal = <p className='text-danger'>Invalid Entry</p>;
  }
  if (invalid) {
    warningMeal = <p className='text-warning'>Inappropriate Input</p>;
  }
  return (
      <>
      <Header header={props.status}/>
        <div className='container '>
          <div className='row d-flex justify-content-center'>
            {invalidWarning}
            <div className='col-10 d-flex justify-content-center col-lg-8' style={{ backgroundColor: '#F5FCFF', borderRadius: '25px' }}>
            <form onSubmit={postItem}>
          <div className="form-group mt-3">
            <label htmlFor="name">{props.purpose} Name</label>
                <input onChange={e => setItem(e.target.value)} type="text" className="form-control" maxLength={15} required id="item" name="item" aria-describedby="AgeHelp" placeholder="Enter Name" />
          </div>
          <div>{warningMeal}</div>
          <div className="form-group">
            <label htmlFor="calories">Total Calories</label>
                <input onChange={e => setCalories(e.target.value)} type="number" className="form-control" max={9999} required id="calories" name="calories" aria-describedby="AgeHelp" placeholder="Enter Calories" />
          </div>
          <div>{warningCal}</div>
          <div className="form-group d-flex justify-content-center mr-3 mt-1">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
            </div>
          </div>
        </div>
      </>
  );
}
