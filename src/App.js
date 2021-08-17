import React from 'react'
import Header from './Header';
import useScript from './useScript'
import Consent from './Consent';
import Questions from './Questions';
import Study from './Eyevote.js';
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  useScript('https://api.gazerecorder.com/GazeCloudAPI.js')
  const startTracking = () => {
    window.GazeCloudAPI.StartEyeTracking()
  }
  const stopTracking = () => {
    window.GazeCloudAPI.StopEyeTracking()
  }

  return (
    <Router>
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
      <button className="start-button"><Link to="/consent">Start</Link></button>
      <Switch>
          <Route path="/consent" component={Consent}>
          </Route>
          <Route path="/questions" component={Questions}></Route>
          <Route path="/study" component={Study}></Route>
       </Switch>
    </div>
    </Router>
  );
}

export default App;
