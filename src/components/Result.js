import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Result({ easyScore, hardScore }) {
  const totalScore = easyScore + hardScore;
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Update result on the server when the component mounts
    updateResult(totalScore);
  }, [totalScore]);

  const updateResult = async (userScore) => {
    try {
      const response = await fetch('http://localhost:3000/updateResult', {
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

  const handleButtonClick = () => {
    // Define the paths for re-doing the test and going back to the home page
    const redoTestPath = '/questions';
    const homePath = '/';

    // Determine the path based on the total score
    const path = totalScore < 5 ? redoTestPath : homePath;

    // Navigate to the determined path
    navigate(path);
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
      {/* Render the button conditionally based on the total score */}
      {totalScore < 5 || totalScore > 8 ? (
        <button onClick={handleButtonClick}>
          {totalScore < 5 ? 'Re-do Test' : 'Go to Home'}
        </button>
      ) : null}
    </div>
  );
}

export default Result;