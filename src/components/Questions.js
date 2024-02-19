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
    <div>Questions</div>
  )
}

export default Questions