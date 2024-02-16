import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Questions = ({ difficulty }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [easyScore, setEasyScore] = useState(0);
  const [hardScore, setHardScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  const fetchQuestions = async () => {
    try {
      const response = await fetch('https://react-quizer-vercel.vercel.app/questions');
      const data = await response.json();
      const easyQuestions = data.slice(0, 10);
      const hardQuestions = data.slice(10, 20);
      setQuestions(difficulty === 'easy' ? shuffleArray(easyQuestions) : shuffleArray(hardQuestions));
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    fetchQuestions();
  }, [difficulty]);

  const handleOptionSelect = (selectedOption) => {
    setSelectedOption(selectedOption);
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.answer;

    if (currentQuestion.difficulty === 'Easy') {
      if (isCorrect) {
        setEasyScore((prevScore) => prevScore + 1);
      }
    } else {
      if (isCorrect) {
        setHardScore((prevScore) => prevScore + 1);
      }
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedOption(null); // Reset selected option after moving to the next question
      } else {
        setQuizCompleted(true);
      }
    }, 500); // Delay for 0.5 seconds before moving to the next question
  };

  const handleContinue = () => {
    setCurrentQuestionIndex(0);
    setEasyScore(0);
    setHardScore(0);
    setQuizCompleted(false);
    fetchQuestions(); // Fetch new questions after continuing
  };

  const handleQuit = () => {
    // Navigate to the home page when quitting
    navigate('/');
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', background: '#f7f7f7', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      {quizCompleted ? (
        <div style={{ textAlign: 'center' }}>
          <h2>Quiz Completed!</h2>
          <p>Easy Score: {easyScore}</p>
          <p>Hard Score: {hardScore}</p>
          <button style={{ marginRight: '10px' }} onClick={handleContinue}>Continue</button>
          <button onClick={handleQuit}>Quit</button>
        </div>
      ) : (
        <div>
          <h3 style={{ background: '#6c757d', color: '#fff', padding: '10px', borderRadius: '4px', marginBottom: '20px' }}>{questions[currentQuestionIndex]?.question}</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {questions[currentQuestionIndex]?.options.map((option, optionIndex) => (
              <li key={optionIndex}>
                <button
                  style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: 'none', background: selectedOption === option ? (option === questions[currentQuestionIndex]?.answer ? 'green' : 'red') : '#fff', color: '#000', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
                  onClick={() => handleOptionSelect(option)}
                  disabled={selectedOption !== null} // Disable button after selecting an option
                >
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
