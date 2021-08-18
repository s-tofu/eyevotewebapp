import React, { useState, useEffect } from 'react'
import './Eyevote.css'


const EyeVote = () => {
    const[question, setQuestion] = useState('0')
    
    function start() {
        window.GazeCloudAPI.StartEyeTracking()
        window.GazeCloudAPI.OnResult = giveMeYourShit
    }

    function giveMeYourShit(result) {
        document.getElementById('dotLookAt').style.left =`${result.docX}px`;
        document.getElementById('dotLookAt').style.top =`${result.docY}px`;
        if (document.getElementById('answerOne').style.left == `${result.docX}px` && document.getElementById('answerOne').style.top == `${result.docY}px`) {
            console.log("Answer one selected!")
        }
    }

    function performMovement() {
        console.log(document.getElementById('answerOne').style.top)
    }
    
    return (
            <div className='Eyevote'>
            performMovement()
             <h1 className='header'>EyeVote Remote</h1>
             <p className='instructions'>You will be presented 10 questions</p>
             <p className='instructions'>Please gaze at the answers you want to select</p>
             <button className='button' onClick={() => start()}>Start eye tracking</button>
             <div className='dot' id='dotLookAt'></div>
             <h1 className='question'>What is your favorite ice cream?</h1>
             <h1 className='answer' id="answerOne">Vanille</h1>
             <h1 className='answer' id="answerTwo">Chocolate</h1>
             <h1 className='answer'>Strawberry</h1>
            </div>
    )
}

export default EyeVote