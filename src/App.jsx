import React, { useState, useEffect } from 'react'
import './App.css'
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { RxSpeakerLoud } from "react-icons/rx";
import { v4 as uuidv4 } from 'uuid';
import Navbar from './components/Navbar'

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  useEffect(() => {
      const todosString = localStorage.getItem("todos")
      if (todosString) {
        const parsedTodos = JSON.parse(todosString)
        setTodos(parsedTodos)
      } else {
      localStorage.setItem("todos", "[]")
      }
  }, [])
  
  const saveToLS = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleAdd = () => {
    const newTodos = [...todos, { id:uuidv4(), todo, isCompleted:false }]
    setTodos(newTodos)
    setTodo("")
    saveToLS(newTodos)
  }
  
  const handleEdit = (e, id) => {
    let t = todos.filter((item)=>{
      return item.id == id
    })
    setTodo(t[0].todo)
    let newTodos = todos.filter((item)=>{
      return item.id!== id
    })
    setTodos(newTodos)
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos);
  }
  const handleSpeak = (e, id) => {
    
  }

  const handleCheckbox = (e, id) => {
    let index = todos.findIndex((item)=>{
      return item.id === id
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS(newTodos);
  }
  
  return (
    <>
      <Navbar />
      <div className="container mx-auto w-3/4 bg-violet-200 rounded-md p-5 my-5 min-h-[80vh]">
        <h1 className='text-center font-bold text-xl'>iTodo - Manage Your Todos</h1>
        <h2 className='p-3 font-bold text-lg'>Add a todo</h2>
        <div className="input px-1 flex gap-3 w-full justify-around">
          <input onChange={handleChange} value={todo} type="text" className='rounded-md bg-white px-4 outline-none w-full ' placeholder='Add Your todo here...' />
          <button onClick={handleAdd} className='p-3 py-1 cursor-pointer bg-violet-800 hover:bg-violet-950 rounded-md text-white font-bold text-sm disabled:bg-violet-300' disabled={todo.length<2}>Save</button>
        </div>
        <h2 className='m-2 my-4 font-bold text-lg'>Your Todos</h2>


        <div className="line h-0.5 bg-slate-700 w-full mx-auto rounded-lg opacity-30"></div>
        {todos.length === 0 && <h1 className='font-bold m-2 text-violet-500 text-lg'>No Todos To display</h1>}
        {todos.map((item) => {
          return <React.Fragment key={item.id}>
            <div  className="todos flex items-center m-2 justify-between">
              <div className='flex gap-3'>
              <input onChange={(e)=>{handleCheckbox(e, item.id)}} className='accent-violet-600' type="checkbox" checked={item.isCompleted} id="" />
              <div className={`font-medium ${item.isCompleted?'line-through':''}`} >{item.todo}</div>
              </div>
              <div className="buttons flex">
                <button onClick={(e)=>{handleSpeak(e, item.id)}} className='p-4 py-2 mx-1 cursor-pointer bg-emerald-500 hover:bg-emerald-900 rounded-md text-white font-bold text-sm'><RxSpeakerLoud /></button>
                <button onClick={(e)=>{handleEdit(e, item.id)}} className='p-4 py-2 mx-1 cursor-pointer bg-violet-800 hover:bg-violet-950 rounded-md text-white font-bold text-sm'><FaEdit /></button>
                <button onClick={(e)=>{handleDelete(e, item.id)}} className='p-4 py-2 mx-1 cursor-pointer bg-red-700 hover:bg-red-800 rounded-md text-white font-bold text-sm'><MdDeleteOutline /></button>
              </div>
            </div>
            <div className="line h-0.5 bg-slate-700 w-full mx-auto rounded-lg opacity-30"></div>
          </React.Fragment>
        })}
      </div>
    </>
  )
}

export default App
