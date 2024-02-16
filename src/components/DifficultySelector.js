import React from 'react';
import { Link } from 'react-router-dom';

function DifficultySelector() {
  return (
    <div>
      <h2>Choose Difficulty</h2>
      <Link to="/questions?difficulty=easy">
        <button>Easy</button>
      </Link>
      <Link to="/questions?difficulty=hard">
        <button>Hard</button>
      </Link>
    </div>
  );
}

export default DifficultySelector;
