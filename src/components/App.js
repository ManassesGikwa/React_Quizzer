import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import DifficultySelector from './DifficultySelector';
import Questions from './Questions';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DifficultySelector />} />
        <Route path="/questions" element={<Questions />} />
       
      </Routes>
    </Router>
  );
}

export default App;