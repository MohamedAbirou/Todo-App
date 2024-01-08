type TodoProps = {
    todo: {
        id: string
        task: string
        isCompleted: boolean
        isEditing: boolean
    }
    removeTodo: (id: string) => void
    toggleComplete: (id: string) => void
    showEditInput: (id: string) => void
}

export const Todo = ({ todo, removeTodo, toggleComplete, showEditInput }: TodoProps) => {
    
    return (
        <div className='Todo'>
            <p onClick={() => toggleComplete(todo.id)} className={`${todo.isCompleted ? 'completed' : ''} max-w-[20em]`}>{todo.task}</p>
            <div>
                <i className='far fa-edit me-3' onClick={() => showEditInput(todo.id)}></i>
                <i className='fas fa-trash-alt' onClick={() => removeTodo(todo.id)}></i>
            </div>
        </div>
    )
}
