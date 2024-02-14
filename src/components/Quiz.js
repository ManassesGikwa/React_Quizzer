import React from 'react';
import Question from './Question';

function Quiz({ difficulty }) {
  // Assuming questions data is passed as props
  const questions = []; // Array of questions based on difficulty

  return (
    <div>
      {questions.map((question, index) => (
        <Question key={index} question={question} />
      ))}
    </div>
  );
}

export default Quiz;
