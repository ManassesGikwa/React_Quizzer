import React from 'react';

const Questions = ({ questions }) => {
  return (
    <div>
      <h2>Questions</h2>
      {questions.map((question, index) => (
        <div key={question.id}>
          <p>{question.question}</p>
          <ul>
            {question.options.map((option, optionIndex) => (
              <li key={optionIndex}>{option}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Questions;
