import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [easyScore, setEasyScore] = useState(0);
  const [hardScore, setHardScore] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const difficulty = searchParams.get('difficulty');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://react-quizer-vercel.vercel.app/questions');
        const data = await response.json();
        const filteredQuestions = data.filter(question => question.difficulty.toLowerCase() === difficulty.toLowerCase());
        setQuestions(filteredQuestions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [difficulty]);

  useEffect(() => {
    if (questions.length > 0) {
      shuffleQuestions();
    }
  }, [questions]);

  const shuffleQuestions = () => {
    const shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    setCurrentQuestionIndex(0);
    setCurrentQuestion(shuffledQuestions[0]);
  };

  const handleOptionSelect = (selectedOption) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.answer;
    if (currentQuestion.difficulty === 'Easy') {
      setEasyScore(prevScore => prevScore + (isCorrect ? 1 : 0));
    } else {
      setHardScore(prevScore => prevScore + (isCorrect ? 1 : 0));
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setCurrentQuestion(questions[currentQuestionIndex + 1]);
    } else {
      // Navigate to the results page when all questions are answered
      navigate('/results', { state: { easyScore, hardScore } });
    }
  };

  return (
    <div>
      {currentQuestion && (
        <div key={currentQuestion.id}>
          <h3>{currentQuestion.question}</h3>
          <ul>
            {currentQuestion.options.map((option, optionIndex) => (
              <li key={optionIndex}>
                <button onClick={() => handleOptionSelect(option)}>{option}</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Questions;