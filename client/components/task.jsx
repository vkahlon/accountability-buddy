import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? 'skyblue' : 'white')};
`;

export default class Task extends React.Component {
  render() {
    return (
      <Draggable
      draggableId={this.props.task.id}
      index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <div className='row d-flex justify-content-center'><img style={{ width: '33%' }} src={this.props.task.icon} alt="icon" /></div>
            <div className='row d-flex justify-content-center'>{this.props.task.content}</div>
            <div className='row d-flex justify-content-center'>{` ${this.props.task.calories} cal`}</div>
          </Container>
        )}
      </Draggable>
    );
  }
}
