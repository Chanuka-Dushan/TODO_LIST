import React, { useState } from 'react'
import axios from 'axios'


export default function Create() {
    const[task,setTask]=useState()
    const submit=()=>{
        axios.post('http://localhost:3001/add',{task:task}).then(result=>console.log(result)).catch(err=>console.log(err))
    }
  return (
    <div>
        <input type="text" onChange={(e)=>setTask(e.target.value)}/>
        <button onClick={submit} type='button'>Submit</button>
    </div>
  )
}
