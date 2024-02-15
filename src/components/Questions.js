import React, { useState, useEffect } from 'react';

const Question = () => {
  // State variables for questions, current set, current questions, scores, and difficulty
  const [questions, setQuestions] = useState([]);
  const [currentSet, setCurrentSet] = useState(1);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [easyScore, setEasyScore] = useState(0);
  const [hardScore, setHardScore] = useState(0);
  const [difficulty, setDifficulty] = useState('easy'); // Default difficulty set to 'easy'

  // Fetch questions from the API and initialize
  useEffect(() => {
    fetchQuestions();
  }, []);

  // Function to fetch questions from the API
  const fetchQuestions = async () => {
    // Fetch questions from the API endpoint
    const response = await fetch('https://react-quizer-vercel.vercel.app/questions');
    const data = await response.json();
    // Shuffle the questions
    const shuffledQuestions = shuffleArray(data);
    // Set shuffled questions to state
    setQuestions(shuffledQuestions);
    // Set initial set of questions to display
    setCurrentQuestions(shuffledQuestions.slice(0, 5)); // Initial set of 5 questions
  };

  // Function to shuffle an array
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Function to handle user's answer to a question
  const handleAnswer = (isCorrect, questionDifficulty) => {
    // Update score based on the difficulty of the question
    if (questionDifficulty === 'Easy') {
      if (isCorrect) {
        setEasyScore((prevScore) => prevScore + 1);
      }
    } else {
      if (isCorrect) {
        setHardScore((prevScore) => prevScore + 1);
      }
    }

    // Check if the current set is complete and switch to the next set
    if (currentSet === 1 && currentQuestions.length === 5) {
      setCurrentSet(2);
      // Check if the user should continue with the same difficulty or switch based on performance
      if (difficulty === 'hard') {
        // If the user chose hard questions first
        if (hardScore >= 3) {
          // Continue with hard questions
          setCurrentQuestions(questions.filter(q => q.difficulty === 'Hard').slice(5, 10)); // Next set of hard questions
        } else {
          // Switch to easy questions
          setDifficulty('easy');
          setCurrentQuestions(questions.filter(q => q.difficulty === 'Easy').slice(5, 10)); // Next set of easy questions
        }
      } else {
        // If the user chose easy questions first
        if (easyScore >= 3) {
          // Continue with easy questions
          setCurrentQuestions(questions.filter(q => q.difficulty === 'Easy').slice(5, 10)); // Next set of easy questions
        } else {
          // Switch to hard questions
        }
      }
    }
  }
}