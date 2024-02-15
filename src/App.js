<<<<<<< HEAD
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
=======
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Quiz from './Quiz';
import Result from './Result';
import DifficultySelector from './DifficultySelector';
import Questions from './Questions'; 
>>>>>>> 5f11b3ebd01f69954b2ad861d5777c397789ab60

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
