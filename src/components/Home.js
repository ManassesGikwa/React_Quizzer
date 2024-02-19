import React from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD


function Home() {
    return (
        <div>

            <h1>Welcome to React Quizzer 👐</h1>
            <h5>A trivia quiz application built with React!</h5>

            <div>
                <h4>Choose Difficulty</h4>
                <Link to="/questions">
                    <button>Easy</button>
                </Link>
                <Link to="/questions">
                    <button>Hard</button>
                </Link>
            </div>
        </div>
    );
=======
import DifficultySelector from './DifficultySelector'
function Home() {
  return (
    <div>
      <h1>Welcome to React Quizzer</h1>
      <p>A trivia quiz application built with React!</p>
      <DifficultySelector />
    </div>
  );
>>>>>>> Manasses
}

export default Home;