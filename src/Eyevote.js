import React, { useState, useEffect } from 'react'
import './Eyevote.css'


const EyeVote = () => {
    
    function start() {
        window.GazeCloudAPI.StartEyeTracking()
        window.GazeCloudAPI.OnResult = giveMeYourShit
    }

    function giveMeYourShit(result) {
        console.log(result)
        document.getElementById('dotLookAt').style.left =`${result.docX}px`;
        document.getElementById('dotLookAt').style.top =`${result.docY}px`;
    }
    
    return (
            <div className='Eyevote'>
             <h1 className='header'>EyeVote Remote</h1>
             <p className='instructions'>You will be presented 10 questions</p>
             <p className='instructions'>Please gaze at the answers you want to select</p>
             <button className="button" onClick={() => start()}>Start eye-tracking</button>
             <div className="dot" id="dotLookAt"></div>
            </div>
    )
}

export default EyeVote