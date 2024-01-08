import React, { useState } from 'react'
import toast from 'react-hot-toast'


type TodoFormProps = {
    addTodo: (todo: string) => void
}

export const TodoForm = ({ addTodo }: TodoFormProps) => {
    const [value, setValue] = useState("")


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(value.trim() !== ''){
            addTodo(value)
            toast.success('New task added successfully!')
            setValue("")
        }else{
            toast.error("Please enter a task!")
        }
    }

    return (
        <form className='TodoForm' onSubmit={handleSubmit}>
            <input type="text" className='todo-input' placeholder='What is the task today?' value={value} onChange={(e) => setValue(e.target.value)} />
            <button type='submit' className='todo-btn mt-2'>Add Task</button>
        </form>
    )
}