import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [easyScore, setEasyScore] = useState(0);
  const [hardScore, setHardScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const navigate = useNavigate();

  const fetchQuestions = async () => {
    try {
      const response = await fetch('https://react-quizer-vercel.vercel.app/questions');
      const data = await response.json();
      setQuestions(shuffleArray(data));
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleAnswer = (isCorrect, difficulty) => {
    if (difficulty === 'Easy') {
      if (isCorrect) {
        setEasyScore((prevScore) => prevScore + 1);
      }
    } else {
      if (isCorrect) {
        setHardScore((prevScore) => prevScore + 1);
      }
    }

    if (currentQuestionIndex < 4) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleContinue = () => {
    setCurrentQuestionIndex(0);
    setEasyScore(0);
    setHardScore(0);
    setQuizCompleted(false);
    setQuestions(shuffleArray(questions));
  };

  const handleQuit = () => {
    // Navigate to the home page when quitting
    navigate('/');
  };

  return (
    <div>
      {quizCompleted ? (
        <div>
          <h2>Quiz Completed!</h2>
          <p>Easy Score: {easyScore}</p>
          <p>Hard Score: {hardScore}</p>
          <button onClick={handleContinue}>Continue</button>
          <button onClick={handleQuit}>Quit</button>
        </div>
      ) : (
        <div>
          <h3>{questions[currentQuestionIndex]?.question}</h3>
          <ul>
            {questions[currentQuestionIndex]?.options.map((option, optionIndex) => (
              <li key={optionIndex}>
                <button onClick={() => handleAnswer(option === questions[currentQuestionIndex]?.answer, questions[currentQuestionIndex]?.difficulty)}>
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Questions;