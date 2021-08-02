import React from 'react'
import useScript from './useScript';

function App() {
  useScript('https://api.gazerecorder.com/GazeCloudAPI.js');
  const startTracking = () => {
    window.GazeCloudAPI.StartEyeTracking();
  }
  const stopTracking = () => {
    window.GazeCloudAPI.StopEyeTracking();
  }

  return (
    <div>
      <h1>EyeVote Web</h1>
      <button onClick= {startTracking}>Start eye tracking</button>
      <button onClick= {stopTracking}>Stop eye tracking</button>
    </div>
  );
}

export default App;
