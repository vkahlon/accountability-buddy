import React from 'react';
import Drag from './drag';
export default class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    const mealList = [];
    const exerciseList = [];
    fetch('api/meals')
      .then(response => response.json())
      .then(data => {
        const mealData = data;
        for (let i = 0; i < mealData.length; i++) {
          const idString = (`meal-${mealData[i].mealId}`);
          mealList.push({ id: idString, content: mealData[i].mealName, calories: -mealData[i].calories, icon: './images/fork.png' });
        }
        return mealList;
      })
      .then(meal => {
        fetch('api/exercises')
          .then(response => response.json())
          .then(data => {
            const exerciseData = data;
            for (let i = 0; i < exerciseData.length; i++) {
              const idString = (`exercise-${exerciseData[i].exerciseId}`);
              exerciseList.push({ id: idString, content: exerciseData[i].exerciseName, calories: exerciseData[i].calories, icon: './images/dumbell.png' });
            }
            return exerciseList;
          })
          .then(exercise => {
            fetch('api/user')
              .then(response => response.json())
              .then(data => {
                const calorie = data;
                this.setState({
                  data: {
                    columns: {
                      'column-1': {
                        id: 'column-1',
                        title: 'Exercises',
                        healthItemIds: exerciseList
                      },
                      'column-2': {
                        id: 'column-2',
                        title: 'Meals',
                        healthItemIds: mealList
                      },
                      'column-3': {
                        id: 'column-3',
                        title: 'Today',
                        healthItemIds: []
                      }
                    },
                    columnOrder: ['column-1', 'column-2', 'column-3'],
                    dailyCalorie: calorie[0].dailyCalorie
                  },
                  isLoading: false,
                  reserveCalorie: calorie[0].dailyCalorie
                }
                );
              });
          });
      });

  }

  render() {
    return this.state.isLoading
      ? <div className='container'>
        <div className='row d-flex justify-content-center'>
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
      : <Drag codex={this.state.data} calorie={this.state.reserveCalorie} />;
  }
}
