
import React, { useEffect, useState } from 'react';
import './App.css';
import Form from './Form';
import Results from './Results';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
 return (
 <Router>
   <Routes>
     <Route path="/" element = {<Form/>}/>
     <Route path="/results" element = {<Results/>}/>
   </Routes>
 </Router>
 )
}

export default App;


