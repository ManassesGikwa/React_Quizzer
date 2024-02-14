import React, { useState, useEffect } from 'react';

const Results = () => {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch data from the API
    fetch('https://react-quizer-vercel.vercel.app/questions')
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    // Calculate the score (for example, count the number of questions with result === 1)
    const userScore = questions.filter(question => question.result === 1).length;
    setScore(userScore);

    // Update result on the server when the score is calculated
    updateResult(userScore);
  }, [questions]);

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

  return (
    <div>
      <h1>Your Quiz Result</h1>
      <p>Your Score: {score}/10</p>

      {score < 5 && <p>Oops, better luck next time!</p>}
      {score >= 5 && score <= 8 && <p>Not bad, keep practicing!</p>}
      {score > 8 && <p>Great job!</p>}

      <p>{message}</p>
    </div>
  );
};

export default Results;
