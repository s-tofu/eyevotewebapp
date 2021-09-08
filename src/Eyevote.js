import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import { useSpring, animated } from 'react-spring'
import './Eyevote.css'

const EyeVote = () => {
    // Attributes

    // State to show Question, shows StartScreen on State zero
    const[question, setQuestion] = useState('0')
    // State for Question undo
    const[undo, setUndo] = useState('0')

    document.createElement('answerOne')
    document.createElement('answerTwo')
    document.createElement('answerThree')

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
    var answerOne_rect
    var answerTwo_rect
    var answerThree_rect

    // x and y coordinates of gaze
    var gaze_x
    var gaze_y
    var gaze_time

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
    var logLabelPositionOne_x = [];
    var logLabelPositionOne_y= [];
    var logLabelPositionTwo_x = []; 
    var logLabelPositionTwo_y = [];
    var logLabelPositionThree_x = [];
    var logLabelPositionThree_y = [];
    var logGazePosition_x = [];
    var logGazePosition_y = [];

    // Question prompts


    // Conditional Question State control
    const questionNumber = () => {
        if (question === '0') {
          return(StartScreen());
        } else if (undo === '1'){
            return(UndoScreen());
        } else if(question === '1'){
            return(QuestionScreen());
        }
      }
    
    // Function on clicking Start button
    function start() {
        // Start with the Calobration and start Eyetracker
        window.GazeCloudAPI.StartEyeTracking()
        
        // Use Gaze 
        window.GazeCloudAPI.OnResult = PlotGaze
    }

    // Handle Gaze results
    function PlotGaze(result) {
        document.getElementById('dotLookAt').style.left =`${result.docX}px`;
        document.getElementById('dotLookAt').style.top =`${result.docY}px`;

        gaze_x = result.docX;
        gaze_y = result.docY;

        console.log("gazex: " + result.docX +" gazey:"+ result.docY)
    }

    // calculates Correlation
    function calculateCorrelation() {
        // import the fn for correlation
        const calculateCorrelation = require("calculate-correlation");

        // get the x and y coordinates of the labels and assign them
        answerOne_rect = document.getElementById('answerOne').getBoundingClientRect();
        answerTwo_rect = document.getElementById('answerTwo').getBoundingClientRect();
        answerThree_rect = document.getElementById('answerThree').getBoundingClientRect();
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
            logLabelPositionOne_x.push(answerOne_x);
            logLabelPositionOne_y.push(answerOne_y);
            logLabelPositionTwo_x.push(answerTwo_x)
            logLabelPositionTwo_y.push(answerTwo_y)
            logLabelPositionThree_x.push(answerThree_x)
            logLabelPositionThree_y.push(answerThree_y)
            logGazePosition_x.push(gaze_x)
            logGazePosition_y.push(gaze_y)

        // calculate the correlation
        corAnswerOne_x = calculateCorrelation(logLabelPositionOne_x, logGazePosition_x);
        corAnswerOne_y = calculateCorrelation(logLabelPositionOne_y, logGazePosition_y);
        corAnswerTwo_x = calculateCorrelation(logLabelPositionTwo_x, logGazePosition_x);
        corAnswerTwo_y = calculateCorrelation(logLabelPositionTwo_y, logGazePosition_y);
        corAnswerThree_x = calculateCorrelation(logLabelPositionThree_x, logGazePosition_x);
        corAnswerThree_y = calculateCorrelation(logLabelPositionThree_y, logGazePosition_y);

        corAnswerOne = corAnswerOne_x + corAnswerOne_y;
        corAnswerTwo = corAnswerTwo_x + corAnswerTwo_y;
        corAnswerThree = corAnswerThree_x + corAnswerThree_y;

        console.log(corAnswerOne)

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
            return () => {
                calculateCorrelation();
              }
        }, gaze_x)
        return (
            <div className='Eyevote'>
                <h1 className='question' id="questionPrompt">What is your favorite ice cream?</h1>
                <label className='answerOne' id="answerOne">Vanille</label>
                <label className='answerTwo' id="answerTwo">Chocolate</label>
                <label className='answerThree' id="answerThree">Strawberry</label>
            </div>
        );
    }

    const UndoScreen = () => {
        return (
            <div className='Eyevote'>
                <h1 className='question' id="questionPrompt">Do you want to change your answer?</h1>
                <label className='answerOne' id="answerOne">Change</label>
                <label className='answerTwo' id="answerTwo">Next</label>
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