import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import { useSpring, animated } from 'react-spring'
import './Eyevote.css'

const EyeVote = () => {
    // Attributes

    // State to show Question, shows StartScreen on State zero
    const[question, setQuestion] = useState('1')
    // const [flip, setFlip] = useState(false)

    // This attribute is set to true if an answer was selected
    var answerOne = false;
    var answerTwo = false;
    var answerThree = false;

    // Labels
    // x and y coordinates of labels
    var answerOne_x
    var answerOne_y
    var answerTwo_x
    var answerTwo_y
    var answerThree_x
    var answerThree_y

    // correlations of labels
    var corAnswerOne
    var corAnswerTwo
    var corAnswerThree
    var corAnswerOne_x
    var corAnswerOne_y
    var corAnswerTwo_x
    var corAnswerTwo_y
    var corAnswerThree_x
    var corAnswerThree_y

    //On Load 
    var presentUser = true;
    var logLabelPosition = [];
    var logGazePosition = [];

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
        //window.GazeCloudAPI.StartEyeTracking()
        
        //performMovement()
        // Use Gaze 
        //window.GazeCloudAPI.OnResult = PlotGaze
    }

    // Handle Gaze results
    function PlotGaze(result) {
        document.getElementById('dotLookAt').style.left =`${result.docX}px`;
        document.getElementById('dotLookAt').style.top =`${result.docY}px`;

        console.log("x: "+ answerOne_x + "y:" + answerOne_y)
        console.log("gazex: " + result.docX +" gazey:"+ result.docY)
        if (answerOne_y === `${result.docX}px` && answerOne_x === `${result.docY}px`) {
            console.log("Answer one selected!")
        }
    }

    function performMovement() {
                  
    }
    

    // calculates Correlation
    function calculateCorrelation() {
        // import the fn for correlation
        const calculateCorrelation = require("calculate-correlation");

        // given 4 points: (2,3), (5,3), (4,6) and (1,7)    
        const x = [2, 5, 4, 1];
        const y = [3, 3, 6, 7];

        // get the x and y coordinates of the labels and assign them
        var answerOne_rect = document.getElementById('answerOne').getBoundingClientRect();
        var answerTwo_rect = document.getElementById('answerTwo').getBoundingClientRect();
        var answerThree_rect = document.getElementById('answerThree').getBoundingClientRect();
        answerOne_x = answerOne_rect.left;
        answerOne_y = answerOne_rect.top;
        answerTwo_x = answerTwo_rect.left;
        answerTwo_y = answerTwo_rect.top;
        answerThree_x = answerThree_rect.left;
        answerThree_y = answerThree_rect.top;

        // console log the answers 
        console.log("AnswerOne x: "+ answerOne_x + " y:" + answerOne_y)
        console.log("AnswerTwo x: "+ answerTwo_x + " y:" + answerTwo_y)
        console.log("AnswerThree x: "+ answerThree_x + " y:" + answerThree_y)

        // constantly push the positions into the position arrays after each second
        const interval = setInterval(() => {
            logLabelPosition.push(answerOne_x);
            logLabelPosition.push(answerOne_y);
          }, 1000);
        console.log(logLabelPosition);

        // calculate the correlation
        const correlation = calculateCorrelation(x, y);

        corAnswerOne = corAnswerOne_x + corAnswerOne_y;
        corAnswerTwo = corAnswerTwo_x + corAnswerTwo_y;
        corAnswerThree = corAnswerThree_x + corAnswerThree_y;

        if ((answerOne === false) && (answerTwo === false) && (answerThree === false))
                    {
                        // If corelation for answer one is over corReference
                        if (((corAnswerOne) >= 1.4))
                        {
                            console.log("Chosen: Answer One");
                            answerOne = true;
                        }

                        // If corelation for answer one is over corReference
                        else if (((corAnswerTwo) >= 1.4))
                        {
                            console.log("Chosen: Answer Two");
                            answerTwo = true;
                        }

                        // If corelation for answer one is over corReference
                        else if (((corAnswerThree) >= 1.4))
                        {
                            console.log("Chosen: Answer Three");
                            answerThree = true;
                        }
                    }
                    else
                    {
                        answerOne = false;
                        answerTwo = false;
                        answerThree = false;
                    }

        console.log(correlation); // logs -0.442807443
        console.log(typeof correlation); // logs number
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
        useEffect(() => {
            const interval = setInterval(() => {
                performMovement();
                calculateCorrelation();
              }, 10000);
            }, [])
        return (
            <div className='Eyevote'>
                <h1 className='question' id="questionPrompt">What is your favorite ice cream?</h1>
                <label className='answerOne' id="answerOne">Vanille</label>
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