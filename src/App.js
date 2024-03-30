import './assets/css/main.css';

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Pages/Home/Home';
import Register from './components/Pages/Register/Register';

function App() {
  return (
    <div className="app-container">
      <div className='app-body'>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />}/>
          <Route path="/register" element={<Register/> }/>
        </Routes>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
