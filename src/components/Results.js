import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Result = ({ easyScore, hardScore }) => {
  const totalScore = easyScore + hardScore;
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    updateResult(totalScore);
  }, [totalScore]);

  const updateResult = async (userScore) => {
    try {
      const response = await fetch('http://localhost:3001/updateResults', {
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

  const handleHome = () => {
    // Navigate to the home page
    navigate('/');
  };

  const handleRedo = () => {
    // Handle redo logic, e.g., resetting scores and questions
    // You might want to implement this based on your requirements
    // For now, let's reload the page to start over
    window.location.reload();
  };

  return (
    <div>
      <h2>Quiz Completed!</h2>
      <p>Easy Score: {easyScore}</p>
      <p>Hard Score: {hardScore}</p>
      <p>Total Score: {totalScore}</p>
      {totalScore > 5 ? <p>Congratulations!</p> : null}
      {totalScore < 5 ? <p>Better luck next time!</p> : null}
      <p>{message}</p>
      <button onClick={handleHome}>Home</button>
      <button onClick={handleRedo}>Re-do</button>
    </div>
  );
};

export default Result;
