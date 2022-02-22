import React from 'react';
import Column from './column';
import { DragDropContext } from 'react-beautiful-dnd';

export default class Drag extends React.Component {
  constructor(props) {
    super(props);
    this.state = { intialData: this.props.codex };
  }

  // onDragEnd = result => {
  //   const { destination, source, draggableId } = result;

  //   if (!destination) {
  //     return;
  //   }

  //   if (
  //     destination.droppableId === source.droppableId &&
  //     destination.index === source.index
  //   ) {
  //     return;
  //   }
  //   const column = this.state.intialData.columns[source.droppableId];
  //   const newTaskIds = Array.from(column.taskIds);
  //   newTaskIds.splice(source.index, 1);
  //   newTaskIds.splice(destination.index, 0, draggableId);

  //   const newColumn = {
  //     ...column,
  //     taskIds: newTaskIds,
  //   };

  //   const newState = {
  //     ...this.state,
  //     columns: {
  //       ...this.state.columns,
  //       [newColumn.id]: newColumn,
  //     },
  //   };
  //   console.log(newState)

  //   this.setState(newState.intialData);
  // };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {this.state.intialData.columnOrder.map(columnId => {
          const column = this.state.intialData.columns[columnId];
          const tasks = column.taskIds;

          return <Column key={column.id} column={column} tasks={tasks} />;
        })};
      </DragDropContext>
    );
  }
}
