import { useEffect, useState } from 'react'
import { TodoForm } from './TodoForm'
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
import { FilterTodo } from './FilterTodos';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import toast from 'react-hot-toast'
uuidv4()

type Todo = {
    id: string
    task: string
    isCompleted: boolean
    isEditing: boolean
}


export const TodoWrapper = () => {
    const [todos, setTodos] = useState<Todo[]>([])
    const [filterText, setFilterText] = useState<string>("")
    const [sortBy, setSortBy] = useState<string>("")

    useEffect(() => {
        const storedTodos = localStorage.getItem('todos')
        if(storedTodos){
            setTodos(JSON.parse(storedTodos))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const addTodo = (todo: string) => {
        setTodos([...todos, {id: uuidv4(), task: todo, isCompleted: false, isEditing: false}])
    }

    const editTodo = (updatedTodo: string, id: string) => {
        setTodos(todos.map(todo => todo.id === id ? {
            ...todo, task: updatedTodo, isEditing: !todo.isEditing
        } : todo))
    }

    const removeTodo = async (id: string) => {
        setTodos(todos.filter(todo => todo.id !== id))
        toast.success('Task is deleted successfully!')
    }

    const showEditInput = (id: string) => {
        setTodos(todos.map(todo => todo.id === id ? {
            ...todo, isEditing: !todo.isEditing
        }: todo))
    }

    const toggleComplete = (id: string) => {
        setTodos(todos.map(todo => todo.id === id ? {
            ...todo, isCompleted: !todo.isCompleted
        } : todo))
    }

    const removeAllCompleted = () => {
        setTodos(todos.filter(todo => !todo.isCompleted))
        toast.success('Completed Tasks removed successfully!')
    }

    const removeAllTasks = () => {
        setTodos(todos.filter(todo => !todo))
    }

    const filteredTodos = todos.filter(todo => todo.task.toLowerCase().includes(filterText.toLowerCase()))

    const totalTasks = todos.length

    if(sortBy === 'asc'){
        filteredTodos.sort((a, b) => a.task.localeCompare(b.task))
    }

    if(sortBy === 'desc'){
        filteredTodos.sort((a, b) => b.task.localeCompare(a.task))
    }

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
          return;
        }
      
        const reorderedTodos = Array.from(filteredTodos);
        const [reorderedTodo] = reorderedTodos.splice(result.source.index, 1);
        reorderedTodos.splice(result.destination.index, 0, reorderedTodo);
      
        setTodos(reorderedTodos);
      };
      
    
    return (
        <>
            <div className='TodoWrapper'>
                <h1>Get Things Done!</h1>
                <TodoForm addTodo={addTodo} />
                <FilterTodo filterText={filterText} setFilterText={setFilterText} sortBy={sortBy} setSortBy={setSortBy} removeAllCompleted={removeAllCompleted} removeAllTasks={removeAllTasks} totalTasks={totalTasks} />
                {totalTasks === 0 ? (
                        <p className='text-xl text-center text-white'>No tasks available.</p>
                    ): (
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId='todo-list'>
                                {(provided) => (
                                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                                        {filteredTodos.map((todo, index) => (
                                            <Draggable key={todo.id} draggableId={todo.id} index={index}>
                                                {(provided) => (
                                                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                        {todo.isEditing ? (
                                                            <EditTodoForm key={todo.id} editTodo={editTodo} todo={todo} />
                                                        ) : (
                                                            <Todo todo={todo} key={todo.id} removeTodo={removeTodo} toggleComplete={toggleComplete} showEditInput={showEditInput} />
                                                        )}
                                                    </li>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </ul>
                                )}
                            </Droppable>
                        </DragDropContext>
                        )}
            </div>
        </>
    );
}
