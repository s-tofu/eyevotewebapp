import React, { useState, useEffect } from 'react'
import './Eyevote.css'

const EyeVote = () => {
    const[question, setQuestion] = useState('0')

    const questionNumber = () => {
        if (question === '0') {
          return(StartScreen());
        } else {
            return(QuestionScreen());
        }
      }
    
    function start() {
        // Start with the Calobration and start Eyetracker
        window.GazeCloudAPI.StartEyeTracking()
        
        performMovement()
        // Use Gaze 
        window.GazeCloudAPI.OnResult = PlotGaze
    }

    function PlotGaze(result) {
        document.getElementById('dotLookAt').style.left =`${result.docX}px`;
        document.getElementById('dotLookAt').style.top =`${result.docY}px`;
        if (document.getElementById('answerOne').style.left == `${result.docX}px` && document.getElementById('answerOne').style.top == `${result.docY}px`) {
            console.log("Answer one selected!")
        }
    }

    function performMovement() {
    }
    
    const StartScreen = () => {
        return (
            <div className='Eyevote'>
                 <h1 className='header'>EyeVote Remote</h1>
                 <p className='instructions'>You will be presented 10 questions</p>
                 <p className='instructions'>Please gaze at the answers you want to select</p>
                 <button className='button' onClick={() => {start(); setQuestion('1');}}>Start eye tracking</button>
            </div>
        );
    }

    const QuestionScreen = () => {
        return (
            <div className='Eyevote'>
                 <h1 className='question'>What is your favorite ice cream?</h1>
                <h1 className='answer' id="answerOne">Vanille</h1>
                <h1 className='answer' id="answerTwo">Chocolate</h1>
                <h1 className='answer'>Strawberry</h1>
            </div>
        );
    }
    return (
            <div className='Eyevote'>
             {questionNumber()}
             <div className='dot' id='dotLookAt'></div>
            </div>
    )
}

export default EyeVote