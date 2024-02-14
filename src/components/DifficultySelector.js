import React from 'react';

const DifficultySelector = ({ onStartQuiz }) => {
  return (
    <div className="difficulty-selector">
      <button className="difficulty-button" onClick={() => onStartQuiz('Easy')}>
        Easy
      </button>
      <button className="difficulty-button" onClick={() => onStartQuiz('Hard')}>
        Hard
      </button>
    </div>
  );
};

export default DifficultySelector;
