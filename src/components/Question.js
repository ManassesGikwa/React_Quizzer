import React, { useState } from 'react';

function Question({ question }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    
    // Check if the selected answer is correct
    const isCorrect = answer === question.correctAnswer;
    setIsAnswerCorrect(isCorrect);

    // Update score
    if (isCorrect) {
      setScore(score + 1);
    }

    // Include the updated score in the feedback message
    const feedbackMessage = isCorrect ? `Correct! Score: ${score + 1}` : 'Incorrect!';
    console.log(feedbackMessage);
  };
  // Add a new question
fetch('http://localhost:8001/questions', {
    method: 'POST'
  })
  .then(response => response.json())
  .then(data => {
    console.log('New question added:', data);
  })
  .catch(error => {
    console.error('Error adding question:', error);
  });
  

  return (
    <div style={{ backgroundColor: isAnswerCorrect === true ? 'green' : isAnswerCorrect === false ? 'red' : 'transparent' }}>
      <h2>{question.text}</h2>
      <ul>
        {question.choices.map((choice, index) => (
          <li key={index}>
            <button onClick={() => handleAnswerSelect(choice)}>
              {choice}
            </button>
          </li>
        ))}
      </ul>
      <p>Score: {score}</p>
      <button>Next Question</button>
    </div>
  );
}

export default Question;
