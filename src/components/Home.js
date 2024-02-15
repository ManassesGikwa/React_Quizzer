import React from 'react';
import { Link } from 'react-router-dom';


function Home() {
    return (
        <div>
            <h1>REACT QUIZZER</h1>
            <h3>Welcome to React Quizzer 👐</h3>
            <h3>A trivia quiz application built with React!</h3>
            <div>
                <h4>Choose Difficulty</h4>
                <Link to="/questions">
                    <button>Easy</button>
                </Link>
                <Link to="/questions">
                    <button>Hard</button>
                </Link>
            </div>
        </div>
    );
}

export default Home;