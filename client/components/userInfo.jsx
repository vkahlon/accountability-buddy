import React from 'react';
import Drag from './drag';
import Loading from './loading';
import Error from './error-message';
export default class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': `${this.props.token}`
      }
    };
    const that = this;
    const meals = fetch('api/meals', req).then(resp => resp.json());
    const exercises = fetch('api/exercises', req).then(resp => resp.json());
    const dailyCalories = fetch('api/user', req).then(resp => resp.json());
    const retrieveALL = async function calling() {
      const results = await Promise.all([meals, exercises, dailyCalories]);
      if (results[0].error === 'an unexpected error occurred') {
        return that.setState({ result: 'failure' });
      }
      const [allMeals, allExercises] = results;
      const userCalories = results[2][0].dailyCalorie;
      return that.setState({
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
        },
        isLoading: false,
        reserveCalorie: userCalories
      }
      );
    };
    retrieveALL();
  }

  render() {
    if (this.state.result === 'failure') {
      return (
        <>
          <Error />
        </>
      );
    }
    return this.state.isLoading
      ? <Loading></Loading>
      : <Drag codex={this.state.data} calorie={this.state.reserveCalorie} />;
  }
}
