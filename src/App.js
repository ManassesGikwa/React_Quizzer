import React from 'react';
import { BrowserRouter as Router, Route, } from 'react-router-dom';
import Home from './Home';
import Quiz from './Quiz';
import results from './Results';
import './App.css'; // Importing App.css
import DifficultySelector from './DifficultySelector'; // Importing DifficultySelector component
import Questions from './Questions'; // Importing Questions component

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/Home" exact component={Home} />
        <Route path="/Quiz" component={Quiz} />
        <Route path="/results" component={results} />
        {/*Render DifficultySelector and Questions components outside of Switch */}
        <DifficultySelector />
        <Questions />
      </div>
    </Router>
  );
}

export default App;