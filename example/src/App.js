import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Userlogin from './Userlogin'; 
import App from './App'; // 确保AppPage组件存在

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Userlogin />} />
        <Route path="/apppage" element={<App />} /> 
      </Routes>
    </Router>
  );
};

export default App;