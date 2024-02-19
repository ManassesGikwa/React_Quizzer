import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DifficultySelector from './components/DifficultySelector';
import Questions from './components/Questions';
<<<<<<< HEAD
import Results from './components/Results';
import Home from './components/Home';
import './App.css';
=======
import Home from './components/Home'
>>>>>>> Manasses

function App() {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<Home />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/results" element={<Results />} />
        <Route path="/difficulty" element={<DifficultySelector />} />
=======
      <Route path="/" element={<Home />} />
        <Route path="/questions" element={<Questions />} />
       
>>>>>>> Manasses
      </Routes>
    </Router>
  );
}

export default App;
