import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Quiz from './Quiz';
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
      </Routes>
    </Router>
  );
}

export default App;
