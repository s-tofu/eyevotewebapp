import React, {useEffect, useRef, useState} from 'react'
import './AccuracyTest.css'
import {db} from '../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import PostStudy from './PostStudy.js';

const AccuracyTest = (props) => {
    const id = useRef(props.id)
    const counter = useRef(1)
    const canvas = useRef()
    const ctx = useRef()
    const dot = useRef()
    const center_x = useRef()
    const center_y = useRef()
    const gaze_x = []
    const gaze_y = [] 
    const accuracyDone = useRef(false)
    const [update, setUpdate] = useState(0)

    const questionNumber = () => {
        if (accuracyDone.current === false) {
            return(Accuracy());
          } else if(accuracyDone.current === true) {
            return <PostStudy id={id.current}/>
          }
    }

    function PlotAccuracy(result) {
        gaze_x.push(result.docX)
        gaze_y.push(result.docY)
    }

    useEffect(()=> {
        if (accuracyDone.current === false) {
        window.GazeCloudAPI.OnResult = PlotAccuracy
        canvas.current = document.getElementById("canvas_circle");
        ctx.current = canvas.current.getContext("2d")
        dot.current = canvas.current.getContext("2d")
        var x = canvas.current.width / 2;
        var y = canvas.current.height / 2;
        var r = 30;

        // draw the circle
        ctx.current.beginPath();
        ctx.current.arc(x, y, r, 0, 2 * Math.PI, false);
        ctx.current.fillStyle = '#FFFFFF';
        ctx.current.fill()
        dot.current.beginPath()
        dot.current.arc(x, y, 5, 0, 2 * Math.PI, false);
        dot.current.fillStyle = 'black';
        dot.current.fill()

        setInterval(()=>{
            center_x.current = window.innerWidth*(parseInt(canvas.current.style.left, 10)/100) + ((parseInt(canvas.current.style.width, 10))/2)
            center_y.current = window.innerHeight*(parseInt(canvas.current.style.top, 10)/100) + ((parseInt(canvas.current.style.height, 10))/2)
            if(counter.current < 10) {
                if(counter.current===3 || counter.current===6){
                    collectAccuracy()
                    shiftCircle(-50,22)
                    gaze_x.length = 0
                    gaze_y.length = 0
                    counter.current ++;
                } else if(counter.current===9) {
                    collectAccuracy()
                    accuracyDone.current = true
                    setUpdate(1)
                } else {
                collectAccuracy()
                shiftCircle(25,0)
                gaze_x.length = 0
                gaze_y.length = 0
                counter.current ++;
                }
            }
        }, 5000)
    }
    })

    function shiftCircle(move_x, move_y) {
        let new_left = parseInt(canvas.current.style.left, 10) + move_x;
        let new_top = parseInt(canvas.current.style.top, 10) + move_y;
        canvas.current.style.left = `${new_left}vw`;
        canvas.current.style.top = `${new_top}vh`;
        
    }

    function collectAccuracy() {
        let deltaX = meanofArray(gaze_x)
        let deltaY = meanofArray(gaze_y)
        let distance = Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY,2));
        if (distance >= (30+5)){
            distance = distance - (30+5);
        }   
        db.collection("studyfiles").doc(id.current).set( {
            accuracy_data: {
            [`accuracy_circ${counter.current}`]: {gaze_x: gaze_x, gaze_y: gaze_y, distance: distance, center_x:center_x.current, center_y:center_y.current}
            }
        }, { merge: true })

    }

    function meanofArray(array) {
        let sum = 0
        for(let i=0; i<array.length; i++){
            sum = sum + array[i]
        }
        let mean = sum/array.length
        return mean
    }
    
    const Accuracy = () => {
        return (
            <div className='AccuracyTest'>
                <canvas id="canvas_circle" style={{position:'absolute', top:'27.7vh', left:'12.5vw', width: '300px', height:'150px'}}></canvas>
            </div>
        );
    }

    return (
        <div>
            {questionNumber()}
        </div>
    );
}

export default AccuracyTest