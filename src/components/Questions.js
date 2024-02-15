// import React, { useState, useEffect } from 'react';

// const Questions = () => {
//   const [questions, setQuestions] = useState([]);
//   const [currentSet, setCurrentSet] = useState(1);
//   const [currentQuestions, setCurrentQuestions] = useState([]);
//   const [easyScore, setEasyScore] = useState(0);
//   const [hardScore, setHardScore] = useState(0); // Added hardScore

//   const fetchQuestions = async () => {
//     try {
//       const response = await fetch('https://react-quizer-vercel.vercel.app/questions');
//       const data = await response.json();
//       setQuestions(data);
//       shuffleAndSetQuestions(data);
//     } catch (error) {
//       console.error('Error fetching questions:', error);
//     }
//   };

//   const shuffleAndSetQuestions = (data) => {
//     const easyQuestions = data.filter(question => question.difficulty === 'Easy');
//     const hardQuestions = data.filter(question => question.difficulty === 'Hard'); // Added hardQuestions

//     const shuffledEasyQuestions = shuffleArray(easyQuestions);
//     const shuffledHardQuestions = shuffleArray(hardQuestions); // Added shuffledHardQuestions

//     setCurrentQuestions(shuffledEasyQuestions.slice(0, 5)); 
//   };

//   const shuffleArray = (array) => {
//     return array.sort(() => Math.random() - 0.5);
//   };

//   useEffect(() => {
//     fetchQuestions();
    
//   }, []);

//   const handleAnswer = (isCorrect, difficulty) => {
//     if (difficulty === 'Easy') {
//       if (isCorrect) {
//         setEasyScore(prevScore => prevScore + 1);
//       }
//     } else { // Handle hard questions
//       if (isCorrect) {
//         setHardScore(prevScore => prevScore + 1);
//       }
//     }

//     if (currentSet === 1 && currentQuestions.length === 5) {
//       setCurrentSet(2);
//       if (easyScore >= 3) {
//         setCurrentQuestions(questions.filter(question => question.difficulty === 'Easy').slice(5, 10));
//       } else {
//         //  logic to show hard questions with appropriate difficulty level and scoring mechanism
//         setCurrentQuestions(questions.filter(question => question.difficulty === 'Hard').slice(0, 5));
//       }
//     } else {
//       // Quiz completed,
//     }
//   };

//   return (
//     <div>
//       {currentQuestions.map((question, index) => (
//         <div key={question.id}>
//           <h3>{question.question}</h3>
//           <ul>
//             {question.options.map((option, optionIndex) => (
//               <li key={optionIndex}>
//                 <button onClick={() => handleAnswer(option === question.answer, question.difficulty)}>
//                   {option}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Questions;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [easyScore, setEasyScore] = useState(0);
  const [hardScore, setHardScore] = useState(0);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('https://react-quizer-vercel.vercel.app/questions');
      const data = await response.json();
      setQuestions(shuffleArray(data));
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const shuffleAndSetQuestions = (data) => {
    const easyQuestions = data.filter(question => question.difficulty === 'Easy');
    const hardQuestions = data.filter(question => question.difficulty === 'Hard');

    const shuffledEasyQuestions = shuffleArray(easyQuestions);
    const shuffledHardQuestions = shuffleArray(hardQuestions);

    setCurrentQuestions(shuffledEasyQuestions.slice(0, 5));
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

    if (currentSet === 1 && currentQuestions.length === 5) {
      setCurrentSet(2);
      if (easyScore >= 3) {
        setCurrentQuestions(questions.filter(question => question.difficulty === 'Easy').slice(5, 10));
      } else {
        setCurrentQuestions(questions.filter(question => question.difficulty === 'Hard').slice(0, 5));
      }
    } else {
      // Quiz completed, navigate to result page
      // You can use a function to navigate or link directly
      // Example using a function to navigate:
      // navigate('/result', { state: { easyScore, hardScore } });
      // OR use a Link directly
      // <Link to={`/result?easyScore=${easyScore}&hardScore=${hardScore}`}>Go to Result</Link>
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
    navigate(`/result?easyScore=${easyScore}&hardScore=${hardScore}`);
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