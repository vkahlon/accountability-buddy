import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  border: 1px solid rgb(232,232,232);
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? 'skyblue' : 'white')};
`;

export default function Item(props) {
  return (
      <Draggable
      draggableId={props.item.id}
      index={props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <div className='row d-flex justify-content-center'><img style={{ width: '30%' }} src={props.item.icon} alt="item-icon" /></div>
            <div className='row d-flex justify-content-center'>{props.item.content}</div>
            <div className='row d-flex justify-content-center'>{` ${props.item.calories} cal`}</div>
          </Container>
        )}
      </Draggable>
  );
}
