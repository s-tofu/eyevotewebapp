import React, { useState, useEffect } from 'react'
import './Eyevote.css'

const EyeVote = () => {
    // State to show Question, shows StartScreen on State zero
    const[question, setQuestion] = useState('0')

    // Question prompts

    // Conditional Question State control
    const questionNumber = () => {
        if (question === '0') {
          return(StartScreen());
        } else if(question === '1'){
            return(QuestionScreen());
        }
      }
    
    // Function on clicking Start button
    function start() {
        // Start with the Calobration and start Eyetracker
        // window.GazeCloudAPI.StartEyeTracking()
        
        performMovement()
        // Use Gaze 
        //window.GazeCloudAPI.OnResult = PlotGaze
    }

    // Handle Gaze results
    function PlotGaze(result) {
        document.getElementById('dotLookAt').style.left =`${result.docX}px`;
        document.getElementById('dotLookAt').style.top =`${result.docY}px`;
        if (document.getElementById('answerOne').style.left == `${result.docX}px` && document.getElementById('answerOne').style.top == `${result.docY}px`) {
            console.log("Answer one selected!")
        }
    }

    function performMovement() {
        console.log(document.getElementById('answerOne').style.top)
    }
    

    // First screen 
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

    // Question screen
    const QuestionScreen = () => {
        return (
            <div className='Eyevote'>
                <h1 className='question' id="questionPrompt">What is your favorite ice cream?</h1>
                <h1 className='answerOne' id="answerOne">Vanille</h1>
                <h1 className='answerTwo' id="answerTwo">Chocolate</h1>
                <h1 className='answerThree' id="answerThree">Strawberry</h1>
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