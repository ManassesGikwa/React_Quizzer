import React from 'react';

function Result({ score, totalQuestions }) {
  const percentage = (score / totalQuestions) * 100;
  let message;

  if (score >= 8) {
    message = "Congratulations!";
  } else if (score < 5) {
    message = "Better luck next time!";
  } else {
    message = "Not bad, keep it up!";
  }

  return (
    <div>
      <h2>Quiz Completed!</h2>
      <p>Your Score: {score}/{totalQuestions}</p>
      <p>Percentage: {percentage.toFixed(2)}%</p>
      <p>{message}</p>
      {/* Add more details or actions as needed */}
    </div>
  );
}

export default Result;
