import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Questions from './components/Questions';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/start-quiz/questions" element={<Questions />} />
      </Routes>
    </Router>
  );
};

export default App;