import React, {useState} from 'react'
import Header from './Header'
import './Questions.css'
import useScript from './useScript'
import EyeVote from './Eyevote';

const Questions = () => {
    const [page, setPage] = useState('home')
    const toPage = (page) => (event) => {
      event.preventDefault()
      setPage(page)
    }
  
    const content = () => {
     if (page === 'eyevote') {
        return <EyeVote />
      }
    }

  const padding = {
    padding: 5
  }
    return (
        <div className='Questions'>
            <Header></Header>
            <h1 className='title'>Demographic Questions</h1>
            <form className='body'>
                <label>
                    How old are you? <p></p>
                    <input type="text" age="age" />
                </label>
                <p></p>
                <label>
                    What is your gender? <p></p>
                    <input type="radio" value="Male" name="gender"/> Male<p></p>
                    <input type="radio" value="Female" name="gender"/> Female<p></p>
                    <input type="radio" value="Non-binary" name="gender"/> Non-binary<p></p>
                    <input type="radio" value="Prefer-not-to-say" name="gender"/> Prefer not to say<p></p>
                    <input type="radio" value="Prefer-to-self-describe" name="gender"/> Prefer to self describe: <input type="text" age="age" />
                </label>
                <p></p>
                <label>
                    How much experience do you have with eye-tracking? <p></p>
                    First time
                    <input type="radio" value="0" name="experience"/>
                    <input type="radio" value="1" name="experience"/>
                    <input type="radio" value="2" name="experience"/>
                    <input type="radio" value="3" name="experience"/>
                    <input type="radio" value="4" name="experience"/>
                    I am very experienced
                </label>
            </form>

            <p className='body'>By clicking on "Start eye-tracking", we will start the Study. You will first be asked to calibrate the webcam eyetracker.
                Please follow the instructions of the calibration and continue with the study afterwards</p>
            <button className="button" ><a href="" onClick={toPage('eyevote')} style={padding}>Start
        </a></button>
        {content()}
        </div>
    )
}

export default Questions