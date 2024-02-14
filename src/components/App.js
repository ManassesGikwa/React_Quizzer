import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Result from './components/Result';
import DifficultySelector from './DifficultySelector';
import Quest
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/home" exact component={Home} />
        <Route path="/quiz" component={Quiz} />
        <Route path="/result" component={Result} />
      </div>
    </Router>
  );
}

export default App;
