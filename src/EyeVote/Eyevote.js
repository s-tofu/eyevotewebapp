import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import { useSpring, animated } from 'react-spring'
import './Eyevote.css'

const EyeVote = () => {
    // Attributes

    // State to show Question, shows StartScreen on State zero
    const[question, setQuestion] = useState(1)
    const[correlation, setCorrelation] = useState('0')
    const[calibrationDone, setCalibrationDone] = useState('0')
    // State for Question undo
    const[undo, setUndo] = useState('1')

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
        if (question === 0) {
          return(StartScreen());
        } else if (undo === '1'){
            return(UndoScreen());
        } else if(question === 1){
            return(QuestionScreen({prompt:"Is this your first time participating in an eyetracker study?", one:"Yes",two:"No", three:"I dont remember"}));
        } else if(question === 2){
            console.log(question)
            return(QuestionScreen({prompt:"Do you prefer working/studying remotely or presence?", one:"Remotely",two:"Presence", three:"I dont mind"}));
        } else if(question === 3){
            return(QuestionScreen({prompt:"Which movie genre do you like the most?", one:"Thriller",two:"Action", three:"Comedy"}));
        } else if(question === 4){
            return(QuestionScreen({prompt:"Which social network do you use most often?", one:"Facebook",two:"Instagram", three:"Twitter"}));
        } else if(question === 5){
            return(QuestionScreen({prompt:"Which beverage would you choose?", one:"Tea",two:"Coffee", three:"Water"}));
        } else if(question === 6){
            return(QuestionScreen({prompt:"Which ice cream flavor would you choose?", one:"Vanilla",two:"Mango", three:"Chocolate"}));
        } else if(question === 7){
            return(QuestionScreen({prompt:"How often do you shop online?", one:"Almost daily",two:"Often", three:"Rarely"}));
        } else if(question === 8){
            return(QuestionScreen({prompt:"Which Superpower would you choose?", one:"Teleportation",two:"Read peoples mind", three:"Invisibility"}));
        } else if(question === 9){
            return(QuestionScreen({prompt:"Where do you like to swim?", one:"Beach",two:"I don't like swimming", three:"Pool"}));
        } else if(question === 10){
            return(QuestionScreen({prompt:"Which chewing gum flavor would you choose?", one:"Peppermint",two:"Bubble Gum", three:"Fruity"}));
        } else if(question === 11){
            return(
                QuestionScreen({prompt:"Thank you for participating"},
            ))
        }
      }
    
    // Function on clicking Start button
    function start() {
        // Set API Key
        window.GazeCloudAPI.APIKey= "GazeBehavior_NonCommercialUse"
        
        // Start with the Calobration and start Eyetracker
        window.GazeCloudAPI.StartEyeTracking()
        
        // Use Gaze 
        window.GazeCloudAPI.OnResult = PlotGaze
        setCalibrationDone('1')
    }

    // Handle Gaze results
    function PlotGaze(result) {
        document.getElementById('dotLookAt').style.left =`${result.docX}px`;
        document.getElementById('dotLookAt').style.top =`${result.docY}px`;

        gaze_x = result.docX;
        gaze_y = result.docY;
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
        //console.log("AnswerOne x: "+ answerOne_x + " y:" + answerOne_y)
        //console.log("AnswerTwo x: "+ answerTwo_x + " y:" + answerTwo_y)
        //console.log("AnswerThree x: "+ answerThree_x + " y:" + answerThree_y)

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
        if(question === '10') {
            setCorrelation('0')
        }

    }
    useEffect(() => {
        if(correlation==='1') {
        //const interval = setInterval(() => {
            calculateCorrelation();
        //}, 1000);
       }
    }, [answerOne_x])
    


    // First screen 
    const StartScreen = () => {
        return (
            <div className='Eyevote'>
                 <h1 className='header'>EyeVote Remote</h1>
                 <p className='instructions'>We will start with a calibration.<p></p>After calibration you will be presented 10 questions. <p></p>Please gaze at the answers you want to select.</p>
                 <button className='eyevotebutton' onClick={() => {start(); setQuestion('1');}}>Start eye tracking</button>
            </div>
        );
    }

    // Question screen
    const QuestionScreen = (props) => {
        console.log(question)
        return (
            <div className='Eyevote'>
                <h1 className='question' id="questionPrompt">{props.prompt}</h1>
                <label className='answerOne' id="answerOne">{props.one}</label>
                <label className='answerTwo' id="answerTwo">{props.two}</label>
                <label className='answerThree' id="answerThree">{props.three}</label>
                <button className='eyevotebutton' onClick={() =>setQuestion(question+1)}></button>
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