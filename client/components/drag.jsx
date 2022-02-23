import React from 'react';
import Column from './column';
import { DragDropContext } from 'react-beautiful-dnd';

export default class Drag extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.codex;
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    const { destination, source } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
       destination.index === source.index
    ) {
      return;
    }
    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];
    if (start === finish) {
      const newResult = Array.from(start.healthItemIds);
      const [removed] = newResult.splice(result.source.index, 1);
      newResult.splice(result.destination.index, 0, removed);

      const newColumn = {
        ...start,
        healthItemIds: newResult
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      };
      return this.setState(newState);
    }
    const startItemIds = Array.from(start.healthItemIds);
    const indexThatLeft = startItemIds.splice(source.index, 1);
    const newStart = {
      ...start,
      healthItemIds: startItemIds
    };
    const finishItemIds = Array.from(finish.healthItemIds);
    finishItemIds.splice(destination.index, 0, indexThatLeft[0]);
    const newFinish = {
      ...finish,
      healthItemIds: finishItemIds
    };
    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };
    const dailyCalorie = this.props.calorie;
    const allColumn3Items = newState.columns['column-3'].healthItemIds;
    let allColumn3Calories = 0;
    for (let i = 0; i < allColumn3Items.length; i++) {
      allColumn3Calories += allColumn3Items[i].calories;
    }
    const currentCodexCalorie = dailyCalorie + allColumn3Calories;
    newState.dailyCalorie = currentCodexCalorie;
    return this.setState(newState);
  }

  render() {
    const exerciseListLength = this.state.columns['column-1'].healthItemIds.length;
    const mealListLength = this.state.columns['column-2'].healthItemIds.length;
    const calculatorListLength = this.state.columns['column-3'].healthItemIds.length;
    let calorieStatement = 'Calories Remaining';
    let emptyWarning = null;
    let calorieLimit = this.state.dailyCalorie;
    let calorieCurrentDescription = 'text-center';
    if (exerciseListLength === 0 && mealListLength === 0 && calculatorListLength === 0) {
      emptyWarning = <p className='text-center font-italic mt-4'>You have No <a href="#meals">Meals</a> or <a href="#exercises">Exercises</a> Added</p>;
    }
    if (this.state.dailyCalorie < 0) {
      calorieStatement = 'Calories Over Limit';
      calorieLimit = calorieLimit * -1;
      calorieCurrentDescription = 'text-center text-danger';
    }
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <h3 className={calorieCurrentDescription}>{calorieLimit} {calorieStatement}</h3>
        {emptyWarning}
        <div className='row d-flex justify-content-center'>
        {this.state.columnOrder.map(columnId => {
          const column = this.state.columns[columnId];
          const items = column.healthItemIds;
          return <Column key={column.id} column={column} item={items} />;
        })}
        </div>
      </DragDropContext>
    );
  }
}
