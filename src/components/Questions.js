import React, { useState, useEffect } from 'react';

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [currentSet, setCurrentSet] = useState(1);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [easyScore, setEasyScore] = useState(0);
  const [hardScore, setHardScore] = useState(0); // Added hardScore

  const fetchQuestions = async () => {
    try {
      const response = await fetch('https://react-quizer-vercel.vercel.app/questions');
      const data = await response.json();
      setQuestions(data);
      shuffleAndSetQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const shuffleAndSetQuestions = (data) => {
    const easyQuestions = data.filter(question => question.difficulty === 'Easy');
    const hardQuestions = data.filter(question => question.difficulty === 'Hard'); // Added hardQuestions

    const shuffledEasyQuestions = shuffleArray(easyQuestions);
    const shuffledHardQuestions = shuffleArray(hardQuestions); // Added shuffledHardQuestions

    setCurrentQuestions(shuffledEasyQuestions.slice(0, 5)); // Adjust initial question count if desired
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
        setEasyScore(prevScore => prevScore + 1);
      }
    } else { // Handle hard questions
      if (isCorrect) {
        setHardScore(prevScore => prevScore + 1);
      }
    }

    if (currentSet === 1 && currentQuestions.length === 5) {
      setCurrentSet(2);
      if (easyScore >= 3) {
        setCurrentQuestions(questions.filter(question => question.difficulty === 'Easy').slice(5, 10));
      } else {
        //  logic to show hard questions with appropriate difficulty level and scoring mechanism
        setCurrentQuestions(questions.filter(question => question.difficulty === 'Hard').slice(0, 5));
      }
    } else {
      // Quiz completed, navigate to results page
    }
  };

  return (
    <div>
      {currentQuestions.map((question, index) => (
        <div key={question.id}>
          <h3>{question.question}</h3>
          <ul>
            {question.options.map((option, optionIndex) => (
              <li key={optionIndex}>
                <button onClick={() => handleAnswer(option === question.answer, question.difficulty)}>
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Questions;
