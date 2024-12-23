"use client"
import { useState } from "react"

interface Todo {
  id: number
  text: string
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingText, setEditingText] = useState("")

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault()
    
    const trimmedValue = newTodo.trim()
    if (!trimmedValue) return
    
    setTodos([...todos, { id: Date.now(), text: trimmedValue }])
    setNewTodo("")
  }

  const handleEdit = (todo: Todo) => {
    setEditingId(todo.id)
    setEditingText(todo.text)
  }

  const handleUpdate = (id: number, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const trimmedValue = editingText.trim()
    if (!trimmedValue) return

    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: trimmedValue } : todo
    ))
    setEditingId(null)
    setEditingText("")
  }

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditingText("")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-center text-gray-800">To-Do List</h1>
      </div>
      <div className="p-6">
        <form onSubmit={handleAddTodo} className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task"
              aria-label="New task input"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={!newTodo.trim()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Add
            </button>
          </div>
        </form>
          
        {todos.length === 0 ? (
          <p className="text-center text-gray-500 py-4">
            No tasks yet. Add one above!
          </p>
        ) : (
          <ul className="space-y-2 mt-4" role="list">
            {todos.map(todo => (
              <li
                key={todo.id}
                className="rounded-lg border border-gray-200 transition-colors"
              >
                {editingId === todo.id ? (
                  <form onSubmit={(e) => handleUpdate(todo.id, e)} className="flex gap-2 p-3">
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      autoFocus
                      className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="submit"
                      disabled={!editingText.trim()}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <div className="flex justify-between items-center p-3 hover:bg-gray-50">
                    <span className="break-all pr-4 text-gray-800">{todo.text}</span>
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => handleEdit(todo)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        aria-label={`Edit task: ${todo.text}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(todo.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label={`Delete task: ${todo.text}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 6h18" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    </div>
    
  )
}

