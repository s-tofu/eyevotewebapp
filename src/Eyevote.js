import React from 'react'
import useScript from './useScript'
import './Eyevote.css'



const EyeVote = () => {
    const startTracking = () => {
    window.GazeCloudAPI.StartEyeTracking()
     }
    const stopTracking = () => {
    window.GazeCloudAPI.StopEyeTracking()
    }

    return (
        <div className='Eyevote'>
            <p className='Eyevote'>
            </p>
            <h1 className='header'>EyeVote Remote</h1>
            <p className='instructions'>You will be presented 10 questions</p>
            <p className='instructions'>Please gaze at the answers you want to select</p>
            <button className="button" onClick={startTracking}>Start eye-tracking</button>
        </div>
    )
}

export default EyeVote