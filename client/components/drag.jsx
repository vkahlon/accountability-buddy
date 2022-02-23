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
    // Moving from one list to another
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
    return this.setState(newState);
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <h3 style={{ textAlign: 'center' }}>{this.state.dailyCalorie} Calories Remaining</h3>
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
