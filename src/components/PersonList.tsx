import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

type Todo = {
    id: string
    task: string
    isCompleted: boolean
    isEditing: boolean
}

type PersonListProps = {
  name: string;
  tasks: Todo[];
};

const PersonList: React.FC<PersonListProps> = ({ name, tasks }) => {
  return (
    <div className="person-lists">
      <h2>{name}</h2>
      <Droppable droppableId={name}>
        {(provided) => (
          <ul
            className="task-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id}
                index={index}
              >
                {(provided) => (
                  <li
                    className="task-item"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {task.task}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
};

export default PersonList;
