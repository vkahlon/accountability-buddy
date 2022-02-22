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
    const column = this.state.columns[source.droppableId];
    const newResult = Array.from(column.taskIds);
    const [removed] = newResult.splice(result.source.index, 1);
    newResult.splice(result.destination.index, 0, removed);

    const newColumn = {
      ...column,
      taskIds: newResult
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn
      }
    };
    this.setState(newState);
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <h1>Test</h1>
        {this.state.columnOrder.map(columnId => {
          const column = this.state.columns[columnId];
          const tasks = column.taskIds;

          return <Column key={column.id} column={column} tasks={tasks} />;
        })};
      </DragDropContext>
    );
  }
}
