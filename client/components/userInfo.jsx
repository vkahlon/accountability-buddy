import React from 'react';
import Drag from './drag';
export default class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        tasks: {
          'task-1': { id: 'task-1', content: 'Mario', strength: 100 },
          'task-2': { id: 'task-2', content: 'Snake', strength: 600 },
          'task-3': { id: 'task-3', content: 'Link', strength: 100 },
          'task-4': { id: 'task-4', content: 'Byleth', strength: 1000 },
          'task-5': { id: 'task-5', content: 'Rooooob', strength: 9001 },
          'task-6': { id: 'task-6', content: 'Steve', strength: 1337 }
        },
        columns: {
          'column-1': {
            id: 'column-1',
            title: 'Exercises',
            taskIds: []
          },
          'column-2': {
            id: 'column-2',
            title: 'Meals',
            taskIds: []
          },
          'column-3': {
            id: 'column-3',
            title: 'Calculate',
            taskIds: []
          }
        },
        columnOrder: ['column-1', 'column-2', 'column-3'],
        dailyCalorie: 0
      },
      isLoading: true
    };
  }

  componentDidMount() {
    const allItems = [];
    const mealList = [];
    const exerciseList = [];
    fetch('api/meals')
      .then(response => response.json())
      .then(data => {
        const mealData = data;
        for (let i = 0; i < mealData.length; i++) {
          const idString = (`meal-${mealData[i].mealId}`);
          mealList.push(idString);
          allItems.push({ id: idString, content: mealData[i].mealName, calories: mealData[i].calories });
        }
        return allItems;
      });
    fetch('api/exercises')
      .then(response => response.json())
      .then(data => {
        const exerciseData = data;
        for (let i = 0; i < exerciseData.length; i++) {
          const idString = (`exercise-${exerciseData[i].exerciseId}`);
          exerciseList.push(idString);
          allItems.push({ id: idString, content: exerciseData[i].exerciseName, calories: exerciseData[i].calories });
        }
        return allItems;
      });

    fetch('api/user')
      .then(response => response.json())
      .then(data => {
        const calorie = data;
        return this.setState({
          data: {
            tasks: allItems,
            columns: {
              'column-1': {
                id: 'column-1',
                title: 'Exercises',
                taskIds: exerciseList
              },
              'column-2': {
                id: 'column-2',
                title: 'Meals',
                taskIds: mealList
              },
              'column-3': {
                id: 'column-3',
                title: 'Calculate',
                taskIds: []
              }
            },
            columnOrder: ['column-1', 'column-2', 'column-3'],
            dailyCalorie: calorie[0].dailyCalorie
          },
          isLoading: false
        }
        );
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
      : <Drag codex={this.state.data} />;
  }
}
