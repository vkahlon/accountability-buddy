import React, { useState, useEffect } from 'react';
import Drag from './drag';
import Loading from './loading';
import Error from './error-message';
export default function UserInfo(props) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState('');
  const [calories, setCalories] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': `${props.token}`
      }
    };
    const meals = fetch('api/meals', req).then(resp => resp.json());
    const exercises = fetch('api/exercises', req).then(resp => resp.json());
    const dailyCalories = fetch('api/user', req).then(resp => resp.json());
    const retrieveALL = async function calling() {
      const results = await Promise.all([meals, exercises, dailyCalories]);
      if (results[0].error === 'an unexpected error occurred') {
        return setResult('failure');
      }
      const [allMeals, allExercises] = results;
      const userCalories = results[2][0].dailyCalorie;
      setData({
        data: {
          columns: {
            'column-1': {
              id: 'column-1',
              title: 'Exercises',
              healthItemIds: allExercises
            },
            'column-2': {
              id: 'column-2',
              title: 'Meals',
              healthItemIds: allMeals
            },
            'column-3': {
              id: 'column-3',
              title: 'Calculate',
              healthItemIds: []
            }
          },
          columnOrder: ['column-1', 'column-2', 'column-3'],
          dailyCalorie: userCalories
        }
      }
      );
      setLoading(false);
      setCalories(userCalories);
    };
    retrieveALL();
  }, []);

  if (result === 'failure') {
    return (
        <>
          <Error />
        </>
    );
  }
  return loading
    ? <Loading></Loading>
    : <Drag codex={data} calorie={calories} />;
}
