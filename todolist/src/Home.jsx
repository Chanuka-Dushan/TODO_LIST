import React,{useEffect, useState} from 'react'
import Create from './Create'
import axios from 'axios'

export default function() {
    const[todos,setTodos]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:3001/get').then(result=>setTodos(result.data)).catch(err=>console.log(err))
    })
  return (
    <div>
        <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">To DO List</h2>
        <Create/>
        {   
            todos.length===0 ? <div><h2 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black'>No Records</h2></div>:
            todos.map(todo=>{
                <div>
                    {todo.task}
                </div>
            })
        }
        
    </div>
  )
}
