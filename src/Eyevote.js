import React, { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import './Eyevote.css'

const EyeVote = () => {
    // State to show Question, shows StartScreen on State zero
    const[question, setQuestion] = useState('0')
    const [flip, setFlip] = useState(false)

    // x and y coordinates of element
    //var answerOne_rect = document.getElementById('answerOne').getBoundingClientRect();
    //var answerOne_x = answerOne_rect.left;
    //var answerOne_y = answerOne_rect.top;

    // Style of animation
    const props = useSpring(
        { 
            to: { x: 1, y: 1 }, 
            from: { x: 350, y: 350 }, 
            reset: true,
            reverse: flip,
            config:{mass:1, tension:200, friction:200},
            onRest: () => setFlip(!flip) 
        })


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
        window.GazeCloudAPI.StartEyeTracking()
        
        performMovement()
        // Use Gaze 
        window.GazeCloudAPI.OnResult = PlotGaze
    }

    // Handle Gaze results
    function PlotGaze(result) {
        document.getElementById('dotLookAt').style.left =`${result.docX}px`;
        document.getElementById('dotLookAt').style.top =`${result.docY}px`;
        // x and y coordinates of element
        var answerOne_rect = document.getElementById('answerOne').getBoundingClientRect();
        var answerOne_x = answerOne_rect.left;
        var answerOne_y = answerOne_rect.top;
        console.log("x: "+ answerOne_x + "y:" + answerOne_y)
        console.log("gazex: " + result.docX +" gazey:"+ result.docY)
        if (answerOne_y === `${result.docX}px` && answerOne_x === `${result.docY}px`) {
            console.log("Answer one selected!")
        }
    }

    function performMovement() {
    }
    

    // First screen 
    const StartScreen = () => {
        return (
            <div className='Eyevote'>
                 <h1 className='header'>EyeVote Remote</h1>
                 <p className='instructions'>We will start with a calibration.<p></p>After calibration you will be presented 10 questions. <p></p>Please gaze at the answers you want to select.</p>
                 <button className='button' onClick={() => {start(); setQuestion('1');}}>Start eye tracking</button>
            </div>
        );
    }

    // Question screen
    const QuestionScreen = () => {
        return (
            <div className='Eyevote'>
                <h1 className='question' id="questionPrompt">What is your favorite ice cream?</h1>
                <animated.div style={props}><label className='answerOne' id="answerOne">Vanille</label></animated.div>
                <label className='answerTwo' id="answerTwo">Chocolate</label>
                <label className='answerThree' id="answerThree">Strawberry</label>
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