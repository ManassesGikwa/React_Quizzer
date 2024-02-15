import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DifficultySelector from './components/DifficultySelector';
import Questions from './components/Questions';

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
