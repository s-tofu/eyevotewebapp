import React, {useRef, useState} from 'react'
import Header from '../Header'
import {db} from '../firebase';
import 'firebase/compat/firestore';

const PostStudy = (props) => {
    const id = useRef("N5YFfvEYMMtl3DkNTZy2")
    const isValid = useRef(false)
    const [distraction, setDistraction] = useState('')
    const [notifications, setNotifications] = useState('')
    const [distractionError, setDistractionError] = useState('')
    const [difficulty, setDifficulty] = useState('')
    const [device, setDevice] = useState('')
    const [accuracy, setAccuracy] = useState('')
    const [difficultyError, setDifficultyError] = useState('')
    const [notificationsError, setNotificationsError] = useState('')
    const [instructions, setInstructions] = useState('')
    const [instructionsError, setInstructionsError] = useState('')
    const [deviceError, setDeviceError] = useState('')
    const [accuracyError, setAccuracyError] = useState('')

    const validate = () => {
        isValid.current = false
        let distractionerr = ""
        let difficultyerr = ""
        let instructionserr = ""
        let notificationserr = ""
        let deviceerr = ""
        let accuracyerr = ""
        if(distraction.length === 0) {
          distractionerr = " * Please select an option."
        }
        if(notifications.length === 0) {
          notificationserr = " * Cannot be empty."
        }
        if(accuracy.length === 0) {
          accuracyerr = " * Cannot be empty."
        }
        if(difficulty.length === 0) {
          difficultyerr = " * Please select an option."
        }
        if(instructions.length === 0) {
          instructionserr = " * Please select an option."
        }
        if (device.length === 0) {
          deviceerr = " * Cannot be empty."
        }
        if(distractionerr || difficultyerr || instructionserr || notificationserr || deviceerr || accuracyerr) {
          setDistractionError(distractionerr)
          setDifficultyError(difficultyerr)
          setInstructionsError(instructionserr)
          setNotificationsError(notificationserr)
          setDeviceError(deviceerr)
          setAccuracyError(accuracyerr)
          return false;
        }
          return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        isValid.current = validate()
        console.log(isValid.current)
        if (isValid.current) {
            db.collection("studyfiles").doc(id.current).set({
                poststudy: {
                    distraction: distraction,
                    distraction_onscreen: notifications,
                    difficulty: difficulty,
                    notes_accuracy: accuracy,
                    need_for_instructions: instructions,
                    device: device
                }
            }, { merge: true })
          .then(function(docRef) {
            alert("Thank you for your participation. You can now close your browser.");
          })
          .catch((error) => {
            alert(error.message);
          })
        }
      }
    return(
        <div className='Questions'>
        <Header></Header>
        <h1 className='title'>Poststudy Questions</h1>
        <form className='body' onSubmit={handleSubmit}>
            <label>
            <p className='question_title'>Were you distracted during the study?<text style={{color: 'red'}}>{distractionError}</text></p>
                Yes
                <input type="radio" value="0" name="distraction" onChange={(e) => setDistraction("Yes")}/>
                <input type="radio" value="1" name="distraction" onChange={(e) => setDistraction("No")}/>
                No
            </label>
            <label>
            <p className='question_title'>Were you distracted by on screen events? E.g. Pop-ups or notifications. <text style={{color: 'red'}}>{notificationsError}</text></p>
              <textarea rows="1" cols="80" value={notifications} onChange={(e) => setNotifications(e.target.value)}/>
            </label>
            <p></p>
            <label>
                <p className='question_title'>How hard was the study to complete? <text style={{color: 'red'}}>{difficultyError}</text></p>
                    Easy
                    <input type="radio" value="0" name="difficulty" onChange={(e) => setDifficulty("0")}/>
                    <input type="radio" value="1" name="difficulty" onChange={(e) => setDifficulty("1")}/>
                    <input type="radio" value="2" name="difficulty" onChange={(e) => setDifficulty("2")}/>
                    <input type="radio" value="3" name="difficulty" onChange={(e) => setDifficulty("3")}/>
                    <input type="radio" value="4" name="difficulty" onChange={(e) => setDifficulty("4")}/>
                    Hard
            </label>
            <label>
                    <p className='question_title'>Did you feel like the selected answer was off? Describe the times that this occured. (How often and when?) <text style={{color: 'red'}}>{accuracyError}</text></p>
                    <textarea rows="5" cols="80" value={accuracy} onChange={(e) => setAccuracy(e.target.value)}/>
            </label>
            <label>
                <p className='question_title'>Did you feel the need for more instructions? <text style={{color: 'red'}}>{instructionsError}</text></p>
                    <input type="radio" value="Yes" name="instructions" onChange={(e) => setInstructions("Yes")}/> Yes<p></p>
                    <input type="radio" value="No" name="instructions" onChange={(e) => setInstructions("No")}/> No<p></p>
                    <input type="radio" value="I don't know" name="instructions" onChange={(e) => setInstructions("I don't know")}/> I don't know<p></p>
            </label>
            <label>
                    <p className='question_title'>Describe the device and webcam you were using. E.g. Windows pc with a plugged in webcam (specify model if you can), Macbook Air with built in webcam...<text style={{color: 'red'}}>{deviceError}</text></p>
                    <textarea rows="5" cols="80" value={device} onChange={(e) => setDevice(e.target.value)}/>
            </label>
            <p className='reminder'>Click on Submit to send out the Poststudy questions and end the study.</p>
        <button className="button" type="submit">Submit</button>
        </form>
    </div>
    )
}

export default PostStudy