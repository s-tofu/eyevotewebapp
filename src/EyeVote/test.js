import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import { useSpring, animated } from 'react-spring'
import './Eyevote.css'
import App from '../App';
import {db} from '../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const EyeVote = (props) => {
    // Attributes
    // import the fn for correlation
    const calculateCorrelation = require("calculate-correlation");

    // State to show Question, shows StartScreen on State zero
    var[question, setQuestion] = useState(0)
    const[correlation, setCorrelation] = useState('0')
    // State for Question undo
    const[undo, setUndo] = useState('0')
    var questionprop = {
        prompt: "Is this your first time participating in an eyetracker study?",
        one:"Yes",
        two:"No", 
        three:"I dont remember"
    }
    var answerselected
    var calibrationDone = false

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
    var log_id = "Sj8tEfUOW2TSWVz84h3U";
    var logLabelPositionOne_x = [];
    var logLabelPositionOne_y= [];
    var logLabelPositionTwo_x = []; 
    var logLabelPositionTwo_y = [];
    var logLabelPositionThree_x = [];
    var logLabelPositionThree_y = [];
    var logGazePosition_x = [];
    var logGazePosition_y = [];

    // Conditional Question State control
    const questionNumber = () => {
        if (question === 0) {
          return(StartScreen());
        } else if (undo === '1'){
            // render the UndoScreen
            return(UndoScreen({prompt: "Your answer was "+ answerselected + ". Do you want to change your answer?: ", change: "Change", next: "Next"}));} 
        else if(question === 1){
            empty();
            return(QuestionScreen(questionprop));
        } else if(question === 2){
            empty();
            questionprop = {prompt:"Do you prefer working/studying remotely or presence?", one:"Remotely",two:"Presence", three:"I dont mind"}
            return(QuestionScreen(questionprop));
        } else if(question === 3){
            empty();
            questionprop = {prompt:"Which movie genre do you like the most?", one:"Thriller",two:"Action", three:"Comedy"}
            return(QuestionScreen(questionprop));
        } else if(question === 4){
            questionprop = {prompt:"Which social network do you use most often?", one:"Facebook",two:"Instagram", three:"Twitter"}
            return(QuestionScreen(questionprop));
        } else if(question === 5){
            questionprop = {prompt:"Which beverage would you choose?", one:"Tea",two:"Coffee", three:"Water"}
            return(QuestionScreen(questionprop));
        } else if(question === 6){
            questionprop = {prompt:"Which ice cream flavor would you choose?", one:"Vanilla",two:"Mango", three:"Chocolate"}
            return(QuestionScreen(questionprop));
        } else if(question === 7){
            questionprop = {prompt:"How often do you shop online?", one:"Almost daily",two:"Often", three:"Rarely"}
            return(QuestionScreen(questionprop));
        } else if(question === 8){
            questionprop = {prompt:"Which Superpower would you choose?", one:"Teleportation",two:"Read peoples mind", three:"Invisibility"}
            return(QuestionScreen(questionprop));
        } else if(question === 9){
            questionprop = {prompt:"Where do you like to swim?", one:"Beach",two:"I don't like swimming", three:"Pool"}
            return(QuestionScreen(questionprop));
        } else if(question === 10){
            questionprop = {prompt:"Which chewing gum flavor would you choose?", one:"Peppermint",two:"Bubble Gum", three:"Fruity"}
            return(QuestionScreen(questionprop));
        } else if(question === 11){
            
            return(
                QuestionScreen({prompt:"Thank you for participating"},
            ))
        }
      }
    
    // Function on clicking Start button
    function start() {
        //add start timestamp
        db.collection("studyfiles").doc(log_id).update( {
            start_time: firebase.firestore.Timestamp.now()
        }
        )

        // Set API Key
        window.GazeCloudAPI.APIKey= "GazeBehavior_NonCommercialUse"
        
        // Start with the Callibration and start Eyetracker
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
        
        Correlation(gaze_x, gaze_y)
    }

    // calculates Correlation
    function Correlation(gaze_x, gaze_y) {
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
        

        // constantly push the positions into the position arrays
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

        console.log("One: " + answerOne + ", Two: " + answerTwo + " , Three: " + answerThree, "set Undo: " + undo)

        //undo screen logic
        if (answerOne === true || answerTwo === true || answerThree === true) {
            if (((corAnswerOne) >= 1.4))
                        {
                            console.log("Change");
                            answerOne = false;
                            empty()
                            sleep(5000).then(() => {setUndo('0')})
                        }

                        // If corelation for answer one is over corReference
                        else if (((corAnswerTwo) >= 1.4))
                        {
                            console.log("Next");
                            answerTwo = false;
                            setQuestion(question+1)
                            empty()
                            sleep(5000).then(() => {setUndo('0')})
                        }
        }
        // check correllation
        sleep(2000)
        if (calibrationDone === true) {
            console.log(corAnswerOne)
        if ((answerOne === false) && (answerTwo === false) && (answerThree === false))
                    {
                        // If correlation for answer one is over corReference
                        if (((corAnswerOne) >= 1.4))
                        {
                            console.log("Chosen: Answer One");
                            answerOne = true;
                            answerselected = questionprop.one
                            empty()
                        }

                        // If correlation for answer two is over corReference
                        else if (((corAnswerTwo) >= 1.4))
                        {
                            console.log("Chosen: Answer Two");
                            answerTwo = true;
                            answerselected = questionprop.two
                            empty()
                        }

                        // If correlation for answer three is over corReference
                        else if (((corAnswerThree) >= 1.4))
                        {
                            console.log("Chosen: Answer Three");
                            answerThree = true;
                            answerselected = questionprop.three
                            empty()
                        }
                    }
                    else
                    {
                        answerOne = false;
                        answerTwo = false;
                        answerThree = false;
                    }
        }
        if(question === 10) {
            setCorrelation('0')
    }
    }
    useEffect(() => {
        // clear for tracking intervall
        const interval = setInterval(() => {
            empty();
        }, 2000);
    },)

    // log data into firestore
    function logData() {

    }


    // empty arrays
    function empty() {
        logLabelPositionOne_x.length = 0;
        logLabelPositionOne_y.length = 0;
        logLabelPositionTwo_x.length = 0; 
        logLabelPositionTwo_y.length = 0;
        logLabelPositionThree_x.length = 0;
        logLabelPositionThree_y.length = 0;
        logGazePosition_x.length = 0;
        logGazePosition_y.length = 0;
    }

    // sleep
    function sleep(milliseconds){
        return new Promise(resolve => setTimeout(resolve, milliseconds))
      }
    


    // First screen 
    const StartScreen = () => {
        return (
            <div className='Eyevote'>
                <label className='answerOne' id="answerOne"> </label>
                <label className='answerTwo' id="answerTwo"> </label>
                <label className='answerThree' id="answerThree"> </label>
                 <h1 className='header'>EyeVote Remote</h1>
                 <p className='instructions'>The study will start with a calibration.<p></p>After calibration you will be presented 10 questions. <p></p>Please gaze at the answers you want to select.</p>
                 <button className='eyevotebutton' onClick={() => {start(); sleep(90000).then(() => {setQuestion(question+1); calibrationDone = true})}}>Start</button>
            </div>
        );
    }

    // Question screen
    const QuestionScreen = (props) => {
        console.log(question)
        console.log(calibrationDone)
        return (
            <div className='Eyevote'>
                <h1 className='question' id="questionPrompt">{props.prompt}</h1>
                <label className='answerOne' id="answerOne">{props.one}</label>
                <label className='answerTwo' id="answerTwo">{props.two}</label>
                <label className='answerThree' id="answerThree">{props.three}</label>
                <button onClick={() =>setUndo('1')}>Done</button>
            </div>
        );
    }

    // Undo Screen
    const UndoScreen = (props) => {
        console.log("Undo screen here hehe")
        return (
            <div className='Eyevote'>
                <h1 className='question' id="questionPrompt">{props.prompt}</h1>
                <label className='answerOne' id="answerOne">{props.change}</label>
                <label className='answerTwo' id="answerTwo">{props.next}</label>
                <label className='answerTwo' id="answerThree"></label>
                <button onClick={() => {setQuestion(question+1); setUndo('0')}}>Next</button>
                <p></p>
                <button onClick={() =>setUndo('0')}>Change</button>
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