import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to React Quizzer</h1>
      <p>A trivia quiz application built with React!</p>
      <div>
        <h2>Choose Difficulty</h2>
        <Link to="/quiz">
          <button>Easy</button>
        </Link>
        <Link to="/quiz">
          <button>Hard</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
