import React from 'react';
import styled from 'styled-components';
import Task from './task';
import { Droppable } from 'react-beautiful-dnd';

const TaskList = styled.div`
  padding: 7px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'lightgreen' : 'white')};
  min-height: 100px;
`;

export default class Column extends React.Component {
  render() {
    return (
      <div className='m-3' style={{ margin: '8px', border: '4px solid rgb(232,232,232)', borderRadius: '5px', width: '140px' }}>
        <h4 className='mt-2 text-center' style={{ color: 'rgb(24, 49, 83)' }}>{this.props.column.title}</h4>
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <TaskList ref={provided.innerRef}
             {...provided.droppableProps}
             isDraggingOver={snapshot.isDraggingOver}
             >
              {this.props.tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </div>
    );
  }
}
