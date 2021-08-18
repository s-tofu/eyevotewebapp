import React, {useState} from 'react'
import Header from './Header';
import useScript from './useScript'
import Consent from './Consent';
import Questions from './Questions';
import Study from './Eyevote.js';
import './App.css'

function App() {
  const [page, setPage] = useState('home')
  const toPage = (page) => (event) => {
    event.preventDefault()
    setPage(page)
  }

  const content = () => {
    if (page === 'consent') {
      return <Consent />
    } else if (page === 'questions') {
      return <Questions />
    }
  }

  const padding = {
    padding: 5
  }
  return (
    <div className="App">
      <Header></Header>
      <h1 className="title">Remote Eye-Tracking Study: EyeVote
      </h1>
      <p className="body">First of all, thank you for your interest in my Bachelor Thesis study “Remote Eye-Tracking Studies: challenges and opportunities of conducting eye-tracking studies out of the lab”. 
      </p>
      <p className="body">For this study, please use your desktop with a webcam or your laptop. A webcam is needed to track your eyes. Once the study starts, you will be asked 10 questions and will gaze at the moving answers that you want to select. The questions will only include neutral and personal questions where there is
        no right or wrong. E.g. “Which ice cream flavor would you choose? Vanilla, Chocolate or Strawberry.”
      </p>
      <p className="body">This study will take approximately 15 minutes.
      </p>
      <p className="body">After clicking Start, you will be led to the Consent Form first. We would then like to ask you to answer some demographic questions.
      </p>
      <button className="start-button"><a href="" onClick={toPage('consent')} style={padding}>
          Start
        </a></button>
       {content()}
    </div>
  );
}

export default App;
