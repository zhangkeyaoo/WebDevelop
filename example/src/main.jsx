import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Head from './Head.jsx'
import Userlogin from './Userlogin.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Head />} />
        <Route path="/login" element={<Userlogin />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
