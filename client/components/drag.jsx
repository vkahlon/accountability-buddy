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
      const newResult = Array.from(start.taskIds);
      const [removed] = newResult.splice(result.source.index, 1);
      newResult.splice(result.destination.index, 0, removed);

      const newColumn = {
        ...start,
        taskIds: newResult
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
    const startTaskIds = Array.from(start.taskIds);
    const indexThatLeft = startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds
    };
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, indexThatLeft[0]);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
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
    const col3Data = newState.columns['column-3'].taskIds;
    let col3Sum = 0;
    for (let i = 0; i < col3Data.length; i++) {
      col3Sum += col3Data[i].calories;
    }
    const todayCalorie = dailyCalorie + col3Sum;
    newState.dailyCalorie = todayCalorie;
    return this.setState(newState);
  }

  render() {
    const exerciseListLength = this.state.columns['column-1'].taskIds.length;
    const mealListLength = this.state.columns['column-2'].taskIds.length;
    let statement = 'Calories Remaining';
    let warning = null;
    let calorieLimit = this.state.dailyCalorie;
    let calorieCalc = 'text-center';
    if (exerciseListLength === 0 && mealListLength === 0) {
      warning = <p className='text-center font-italic mt-4'>You have No <a href="#meals">Meals</a> or <a href="#exercises">Exercises</a> Added</p>;
    }
    if (this.state.dailyCalorie < 0) {
      statement = 'Calories Over Limit';
      calorieLimit = calorieLimit * -1;
      calorieCalc = 'text-center text-danger';
    }
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <h3 className={calorieCalc}>{calorieLimit} {statement}</h3>
        {warning}
        <div className='row d-flex justify-content-center'>
        {this.state.columnOrder.map(columnId => {
          const column = this.state.columns[columnId];
          const tasks = column.taskIds;
          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
        </div>
      </DragDropContext>
    );
  }
}
