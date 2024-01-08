import React, { useState } from 'react'
import toast from 'react-hot-toast'

type EditTodoFormProps = {
    todo: {
        id: string
        task: string
        isCompleted: boolean
        isEditing: boolean
    }
    editTodo: (updatedTodo: string, id:string) => void
}

export const EditTodoForm = ({ editTodo, todo }: EditTodoFormProps) => {
    const [value, setValue] = useState(todo.task)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        editTodo(value, todo.id)

        toast.success(`Task N°${todo.id.slice(0, 2)} updated successfully!`)

        setValue("")
    }

    return (
        <form className='TodoForm' onSubmit={handleSubmit}>
            <input type="text" className='todo-input mb-5 rounded-s-md' placeholder='Update Task' value={value} onChange={(e) => setValue(e.target.value)} />
            <button type='submit' className='todo-btn rounded-e-md mb-2'>Update Task</button>
        </form>
    )
}

