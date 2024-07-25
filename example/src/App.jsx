import { useState } from 'react'
import './App.css'
import React, { Component } from "react"
import { useNavigate } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)
  const navigate=useNavigate()
  return (
    <>
      <nav className='apppage'>

        <div className="card">
          <p>
            <button > 好友列表 </button>
          </p>
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more you are <b>dongdongzhu</b>
        </p>
      </nav> 
    </>
  
    
      
  )
  };  
    

export default App
