import React from 'react'
import Header from './Header';
import useScript from './useScript'
import Consent from './Consent';
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
      <p className="body">For this study, please use your desktop with a webcam or your laptop. Your webcam will be used to track your eyes. You will be asked 10 questions and will gaze at the moving answers that you want to select. The questions will include neutral and personal questions where there is
        no right or wrong. E.g. “Which ice cream flavor would you choose? Vanilla, Chocolate or Strawberry.”
      </p>
      <p className="body">This study will take approximately 15 minutes.
      </p>
      <p className="body">Please read the <Link to="/consent">Consent Form</Link> first. After the Consent Form, we would like to ask you to answer some demographic and general questions.
      </p>
      <button className="start-button">Start*</button>
      <p className="note">*By pressing “Start”, I assure that I have read and understood the above consent and thus was informed about my rights. I certify that I agree to the processing of my data
        by the LMU Munich and Bundeswehr University Munich.
      </p>
      <Switch>
          <Route path="./Consent">
            <Consent />
          </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
