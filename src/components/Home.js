import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const Home = () => (
  <Fragment>
    <Helmet>
      <title>Quizer_App - Home</title>
    </Helmet>
    <div id='home'>
       <section>
        <div>

        </div>
        <h1>REACT QUIZZER</h1>
        <h2>Choose Difficulty</h2>
        <div className='DifficultySelector-container'>
          <Link to="/DifficultySelector-easy">Easy</Link>
          <Link to="/DifficultySelector-hard">Hard</Link>
        </div>
        <div className='Start-Quiz-button-container'>
            <ul>
              <li><Link to="/start-quiz">Start Quiz</Link></li>
            </ul>
        </div>
       </section>
    </div>
  </Fragment>
);

export default Home;