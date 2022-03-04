import React from 'react';
import Drag from './drag';
import Loading from './loading';
export default class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    let mealList = null;
    let exerciseList = null;
    fetch(`api/meals/${this.props.userId}`)
      .then(response => response.json())
      .then(data => {
        mealList = data;
      })
      .then(meal => {
        fetch(`api/exercises/${this.props.userId}`)
          .then(response => response.json())
          .then(data => {
            exerciseList = data;
          })
          .then(exercise => {
            fetch(`api/user/${this.props.userId}`)
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
                        title: 'Calculate',
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
      ? <Loading></Loading>
      : <Drag codex={this.state.data} calorie={this.state.reserveCalorie} />;
  }
}
