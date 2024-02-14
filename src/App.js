import React, { useState, useEffect } from 'react';
import './App.css';
import DifficultySelector from './components/DifficultySelector';
import Questions from './components/Questions';
import Result from './components/Result';

function App() {
  const [difficulty, setDifficulty] = useState('');
  const [questions, setQuestions] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://react-quizer-vercel.vercel.app/questions');
        const data = await response.json();
        const filteredQuestions = data.filter(question => question.difficulty === difficulty);
        setQuestions(filteredQuestions);
        setQuizStarted(true);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    if (quizStarted && questions.length === 0) {
      fetchQuestions();
    }
  }, [difficulty, quizStarted, questions]);

  const onStartQuiz = () => {
    if (difficulty) {
      setQuizStarted(true);
    }
  };

  const onFinishQuiz = () => {
    setQuizFinished(true);
  };

  return (
    <div className="App">
      <h1>React Quizzer</h1>
      <h2>Choose Difficulty:</h2>
      <DifficultySelector setDifficulty={setDifficulty} />
      {difficulty && !quizStarted && (
        <button onClick={onStartQuiz}>Start Quiz</button>
      )}
      {quizStarted && questions.length > 0 && !quizFinished && (
        <Questions questions={questions} onFinishQuiz={onFinishQuiz} />
      )}
      {quizFinished && <Result />}
    </div>
  );
}

export default App;
