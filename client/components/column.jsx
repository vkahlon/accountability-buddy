import React from 'react';
import styled from 'styled-components';
import Task from './task';
import { Droppable } from 'react-beautiful-dnd';

const Container = styled.div`
  margin: 8px;
  border: 1px solid black;
  border-radius: 2px;
  width: 400px
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
`;

export default class Column extends React.Component {
  render() {
    return (
      <Container>
        <Title style={{ textAlign: 'center' }}>{this.props.column.title}</Title>
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
      </Container>
    );
  }
}
