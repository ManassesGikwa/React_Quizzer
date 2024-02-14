import React from 'react';

function DifficultySelector({ onSelect }) {
  const handleSelect = (difficulty) => {
    onSelect(difficulty);
  };

  return (
    <div>
      <h2>Choose Difficulty</h2>
      <button onClick={() => handleSelect('easy')}>Easy</button>
      <button onClick={() => handleSelect('hard')}>Hard</button>
    </div>
  );
}

export default DifficultySelector;
