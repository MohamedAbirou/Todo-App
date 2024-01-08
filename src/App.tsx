import { useEffect } from "react"
import { TodoWrapper } from "./components/TodoWrapper"
import toast, { Toaster } from 'react-hot-toast'

function App() {
  useEffect(() => {
    toast.success('Tasks are draggable!!!')
  }, [])
  return (
    <>
      <div className="App">
        <Toaster />
        <TodoWrapper />
      </div>
    </>
  )
}

export default App
