import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Result from './Result';
import DifficultySelector from './DifficultySelector';
import Questions from './Questions';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/difficulty-selector" element={<DifficultySelector />} />
        <Route path="/questions" element={<Questions />} />
      </Routes>
    </Router>
  );
}

export default App;
