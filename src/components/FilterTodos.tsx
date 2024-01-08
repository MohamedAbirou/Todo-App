type TodoFormProps = {
    filterText: string
    setFilterText: any
    sortBy: string
    setSortBy: any
    removeAllCompleted: () => void
    removeAllTasks: () => void
    totalTasks: number
}

export const FilterTodo = ({ filterText, setFilterText, sortBy, setSortBy, removeAllCompleted, totalTasks, removeAllTasks }: TodoFormProps) => {
    return (
        <form className='TodoForm' >
            <input type="text" className='todo-input2 placeholder:text-[#ffffff4d]' placeholder='Filter tasks...' value={filterText} onChange={(e) => setFilterText(e.target.value)} />
            <div className='flex justify-between flex-col md:flex-row gap-5 items-center mb-5'>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className='px-5 py-1 rounded-lg bg-[#f4b41a] text-black font-bold cursor-pointer outline-none'>
                    <option value="">Sort By</option>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
                <div className="flex flex-col md:flex-row justify-center items-center space-x-3 space-y-3 md:space-y-0">
                    <button type="button" className="px-5 py-1 rounded-lg bg-red-600 text-white cursor-pointer outline-none" onClick={removeAllCompleted}>Clear Completed Tasks</button>
                    <button type="button" className="px-5 py-1 rounded-lg bg-red-600 text-white cursor-pointer outline-none" onClick={removeAllTasks}>Clear All Tasks</button>
                </div>
            </div>
            <div className="w-max mx-auto mb-5 px-5 py-1 rounded-lg bg-[#f4b41a] text-black font-bold">{totalTasks} Tasks</div>
        </form>
    )
}
