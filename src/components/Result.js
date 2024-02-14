import React from 'react';

function Result({ easyScore, hardScore }) {
  const totalScore = easyScore + hardScore;

  return (
    <div>
      <h2>Quiz Completed!</h2>
      <p>Easy Score: {easyScore}</p>
      <p>Hard Score: {hardScore}</p>
      <p>Total Score: {totalScore}</p>
      {totalScore > 8 && <p>Congratulations!</p>}
      {totalScore < 5 && <p>Better luck next time!</p>}
      
    </div>
  );
}

export default Result;
