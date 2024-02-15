import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

import Home from './components/Home';
import Result from './components/Result';
import DifficultySelector from './components/DifficultySelector';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/difficulty-selector" element={<DifficultySelector />} />
      </Routes>
    </Router>
  );
}

export default App;
