import React from 'react'
import Header from './Header'
import './Questions.css'
import useScript from './useScript'
import {
    Link
  } from "react-router-dom";

const Questions = () => {
    useScript('https://api.gazerecorder.com/GazeCloudAPI.js')
    const startTracking = () => {
    window.GazeCloudAPI.StartEyeTracking()
     }
    const stopTracking = () => {
    window.GazeCloudAPI.StopEyeTracking()
    }
    return (
        <div className='Questions'>
            <Header></Header>
            <h1 className='title'>Demographic Questions</h1>
            <form className='body'>
                <label>
                    How old are you? <p></p>
                    <input type="text" age="age" />
                </label>
                <p></p>
                <label>
                    What is your gender? <p></p>
                    <input type="radio" value="Male" name="gender"/> Male<p></p>
                    <input type="radio" value="Female" name="gender"/> Female<p></p>
                    <input type="radio" value="Other" name="gender"/> Other<p></p>
                </label>
                <p></p>
                <label>
                    How much experience do you have with eye-tracking? <p></p>
                    First time
                    <input type="radio" value="0" name="experience"/>
                    <input type="radio" value="1" name="experience"/>
                    <input type="radio" value="2" name="experience"/>
                    <input type="radio" value="3" name="experience"/>
                    <input type="radio" value="4" name="experience"/>
                    I am very experienced
                </label>
            </form>

            <p className='body'>By clicking on "Start eye-tracking", we will start the Study. You will first be asked to calibrate the webcam eyetracker.
                Please follow the instructions of the calibration and continue with the study afterwards</p>
            <button className="button"><Link to="/">Go back</Link></button>
            <button className="button" onClick={startTracking}>Start eye-tracking</button>
        </div>
    )
}

export default Questions