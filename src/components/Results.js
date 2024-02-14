import React from 'react';

const Result = ({ score, totalQuestions }) => {
  return (
    <div className="result-container">
      <h2>Quiz Finished!</h2>
      <p>Your Score: {score}/{totalQuestions}</p>
    </div>
  );
};

export default Result;
