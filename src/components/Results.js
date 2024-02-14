import React, { useState, useEffect } from 'react';

function Result({ easyScore, hardScore }) {
  const totalScore = easyScore + hardScore;
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Update result on the server when the component mounts
    updateResult(totalScore);
  }, [totalScore]);

  const updateResult = async (userScore) => {
    try {
      const response = await fetch('http://localhost:3001/updateResult', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ score: userScore }),
      });

      if (response.ok) {
        setMessage('Result updated successfully');
      } else {
        setMessage('Error updating result');
      }
    } catch (error) {
      console.error('Error updating result:', error);
      setMessage('An unexpected error occurred');
    }
  };

  return (
    <div>
      <h2>Quiz Completed!</h2>
      <p>Easy Score: {easyScore}</p>
      <p>Hard Score: {hardScore}</p>
      <p>Total Score: {totalScore}</p>
      {totalScore > 8 && <p>Congratulations!</p>}
      {totalScore < 5 && <p>Better luck next time!</p>}
      <p>{message}</p>
    </div>
  );
}

export default Result;
