import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import { useSpring, animated } from 'react-spring'
import './Eyevote.css'
import App from '../App';
import {db} from '../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const EyeVote = (props) => {
    const [log_id, setLog_id] = useState(props.id)
    
    return (
        <div className='Eyevote'>
         <h1 className='header'>EyeVote Remote with id: {props.id}</h1>
         <div className='dot' id='dotLookAt'></div>
        </div>
)
}

export default EyeVote