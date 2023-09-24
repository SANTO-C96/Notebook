
import './App.css';

import React from "react";
import {BrowserRouter,Route,Routes } from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Sign from './components/Sign';

function App() {
  return (
    <> 
    <NoteState>
    <BrowserRouter>
    <div className="container-flex">
    <Routes>
     
          <Route  exact path="/" element={<Home/>}/> 
          <Route   exact path="/about" element={<About/>}/>
          <Route   exact path="/login" element={<Login/>}/>
          <Route   exact path="/sign" element={<Sign/>}/>
          
      </Routes>
      </div>
      </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
