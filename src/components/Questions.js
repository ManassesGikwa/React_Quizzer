import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Questions = () => {
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
      const shuffledQuestions = shuffleArray(data).slice(0, 5); // Take the first 5 questions
      setQuestions(shuffledQuestions);
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
    }, 1000); // Delay for 1 second before moving to the next question
  };

  const handleRedo = () => {
    setCurrentQuestionIndex(0);
    setEasyScore(0);
    setHardScore(0);
    setQuizCompleted(false);
    setQuestions(shuffleArray(questions));
  };

  const handleHome = () => {
    // Navigate to the home page when quitting
    navigate('/');
  };

  // Calculate total score and message
  const totalScore = easyScore + hardScore;
  let message = '';
  if (quizCompleted) {
    if (totalScore > 8) {
      message = '🎉 Congratulations! You did great!';
    } else if (totalScore < 5) {
      message = '😔 Better luck next time!';
    } else {
      message = '👍 Good job!';
    }
  }

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', background: '#f7f7f7', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      {quizCompleted ? (
        <div style={{ textAlign: 'center' }}>
          <h2>Quiz Completed!</h2>
          <p>Easy Score: {easyScore}</p>
          <p>Hard Score: {hardScore}</p>
          <p>Total Score: {totalScore}</p>
          <p>{message}</p>
          <button style={{ marginRight: '10px' }} onClick={handleRedo}>Redo</button>
          <button onClick={handleHome}>Home</button>
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