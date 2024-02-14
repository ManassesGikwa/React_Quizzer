import React, { useState } from 'react';
import Question from './Question';
import Result from './Result';

function Quiz() {
  // State variables for managing quiz logic
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [easyScore, setEasyScore] = useState(0);
  const [hardScore, setHardScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Array of questions (you may fetch this from an API or define it in the component)
  const questions = [
    // Define your questions here
  ];

  // Function to handle user's answer to a question
  const handleAnswer = (isCorrect, difficulty) => {
    if (difficulty === 'Easy') {
      if (isCorrect) {
        setEasyScore(prevScore => prevScore + 1);
      }
    } else {
      if (isCorrect) {
        setHardScore(prevScore => prevScore + 1);
      }
    }

    // Move to the next question or display the result if all questions are answered
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  return (
    <div>
      {quizCompleted ? (
        <Result easyScore={easyScore} hardScore={hardScore} />
      ) : (
        <Question
          question={questions[currentQuestionIndex]}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
}

export default Quiz;
