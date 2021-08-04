import React from 'react'
import Header from './Header'
import './Questions.css'

const Questions = () => {
    return (
        <div className='App'>
            <Header></Header>
            <h1 className='title'>Demographic Questions</h1>
            <p className='body'>How old are you?</p>
            <p className='body'>What is your gender?</p>
            <p className='body'>How much experience do you have with eye-tracking?</p>

            <p className='body'>By clicking on Start, we will start the Study. You will first be asked to calibrate the webcam eyetracker.
Please follow the instructions of the calibration and continue with the study afterwards</p>
        </div>
    )
}

export default Questions