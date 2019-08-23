import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

class DragDropWrapper extends Component {
  onDragEnd = result => {
    if (!result.destination) return;

    const { items, action } = this.props;

    const reorder = (list, startIndex, endIndex) => {
      const res = Array.from(list);
      const [removed] = res.splice(startIndex, 1);
      res.splice(endIndex, 0, removed);

      return res;
    };

    const currItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    action(currItems.map(item => item.id));
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {provided => (
            <div
              className={this.props.className}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {this.props.children}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default DragDropWrapper;
