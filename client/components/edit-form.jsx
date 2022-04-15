import React, { useState } from 'react';
import EditStats from './edit-stats';
import Header from './header';
import EditItem from './edit-item';
import Loading from './loading';
import BannedWords from 'profane-words';
export default function EditForm(props) {

  const [stage, setStage] = useState(0);
  const [calories, setCalories] = useState('');
  const [results, setResults] = useState('');
  const [item, setItem] = useState('');
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const submit = event => {
    if (event !== undefined) event.preventDefault();
    setLoading(true);
    const nameCheck = item;
    if (BannedWords.includes(nameCheck.toLowerCase())) {
      setLoading(false);
      return setInvalid(true);
    }
    const action = props.purpose;
    const id = props.item.id;
    const req = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': `${props.token}`
      },
      body: JSON.stringify({ item: item, calories: calories })
    };
    fetch(`/api/calorie/edit-${action}/${id}`, req)
      .then(res => res.json())
      .then(data => {
        setResults(data);
        setStage(1);
        setLoading(false);
        setInvalid(false);
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
  if (stage === 1) {
    return (
        <>
          <Header header={`${props.purpose} Changed`} />
          < EditStats stats={results} purpose={props.purpose} />
        </>
    );
  }
  if (stage === 2) {
    return (
        <>
          <EditItem token={props.token} user={props.user} purpose={props.purpose} status={`${props.status}s`} />
        </>
    );
  }
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
        <Header header={props.status} />
        <div className='container '>
          <div className='row d-flex justify-content-center'>
            <div className='col-10 d-flex justify-content-center col-lg-8' style={{ backgroundColor: '#F5FCFF', borderRadius: '25px' }}>
              <form onSubmit={submit}>
                <div className="form-group mt-3">
                  <label htmlFor="name">Edit {props.purpose} Name</label>
                  <input onChange={e => setItem(e.target.value)} type="text" className="form-control" maxLength={15} required id="item" name="item" aria-describedby="AgeHelp" placeholder={props.item.content} />
                </div>
                <div>{warningMeal}</div>
                <div className="form-group">
                  <label htmlFor="calories">Edit Total Calories</label>
                  <input onChange={e => setCalories(e.target.value)} type="number" className="form-control" max={9999} required id="calories" name="calories" aria-describedby="AgeHelp" placeholder={props.item.calories} />
                </div>
                <div>{warningCal}</div>
                <div className="form-group d-flex justify-content-around mt-2">
                  <button type="submit" className="btn btn-primary mr-3">Submit</button>
                </div>
              </form>
            </div>
          </div>
          <div className='row d-flex justify-content-center'>
            <button onClick={() => { setStage(2); }} className="btn btn-link mt-3 mr-3">Go Back</button>
          </div>
        </div>
      </>
  );
}
