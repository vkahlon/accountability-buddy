import React from 'react';
import styled from 'styled-components';
import Item from './item';
import { Droppable } from 'react-beautiful-dnd';

const ItemList = styled.div`
  padding: 7px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'lightgreen' : 'white')};
  min-height: 100px;
`;
export default function Column(props) {
  return (
      <div className='m-3' style={{ margin: '8px', border: '4px solid rgb(232,232,232)', borderRadius: '5px', width: '140px' }}>
        <h4 className='mt-2 text-center' style={{ color: 'rgb(24, 49, 83)' }}>{props.column.title}</h4>
        <Droppable droppableId={props.column.id}>
          {(provided, snapshot) => (
            <ItemList ref={provided.innerRef}
             {...provided.droppableProps}
             isDraggingOver={snapshot.isDraggingOver}
             >
              {props.item.map((item, index) => (
                <Item key={item.id} item={item} index={index} />
              ))}
              {provided.placeholder}
            </ItemList>
          )}
        </Droppable>
      </div>
  );
}
