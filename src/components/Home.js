import React from 'react';
import { Link } from 'react-router-dom';

<<<<<<< HEAD
function Home() {
  const handleDifficultySelect = (difficulty) => {
    // Handle difficulty selection logic here, e.g., navigate to the quiz page with selected difficulty
    console.log('Selected difficulty:', difficulty);
  };

  return (
    <div>
      <h1>Welcome to React Quizzer</h1>
      <p>A trivia quiz application built with React!</p>
      <Link to="/quiz">Start Quiz</Link> {/* This link will navigate to the quiz page */}
    </div>
  );
}

export default Home;
=======
const Home = () => {
  return (
    <div>
      
    </div>
  );
};

export default Home;
>>>>>>> refs/remotes/origin/development
