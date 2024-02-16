import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DifficultySelector from './components/DifficultySelector';
import Questions from './components/Questions';
import Results from './components/Results';
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/results" element={<Results />} />
        <Route path="/difficulty" element={<DifficultySelector />} />
      </Routes>
    </Router>
  );
}

export default App;
