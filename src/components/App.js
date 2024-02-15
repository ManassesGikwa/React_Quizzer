import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Quiz from './Quiz';
import Result from './Result';
import DifficultySelector from './DifficultySelector'; // Importing DifficultySelector component
import Questions from './Questions'; // Importing Questions component

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/home" exact component={Home} />
          <Route path="/quiz" component={Quiz} />
          <Route path="/result" component={Result} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
