import React, {useState} from 'react'
import Header from './Header';
import './App.css'
import EyeVote from './EyeVote/Eyevote';

function App() {
  const [page, setPage] = useState('home')
  const toPage = (page) => (event) => {
    event.preventDefault()
    setPage(page)
  }

  const content = () => {
    if (page === 'consent') {
      return (Consent());
    } else if (page === 'questions') {
      return (Questions());
    } else if (page === 'home') {
      return (Home());
    }
    if (page === 'eyevote') {
      return <EyeVote />
    }
  }

  const Home = () => {
    return(
        <div className="App">
        <Header></Header>
        <h1 className="title">Remote Eye-Tracking Study: EyeVote
        </h1>
        <p className="body">First of all, thank you for your interest in my Bachelor Thesis study “Remote Eye-Tracking Studies: challenges and opportunities of conducting eye-tracking studies out of the lab”. 
        </p>
        <p className="body">For this study, please use your desktop with a webcam or your laptop. A webcam is needed to track your eyes. Once the study starts, you will be asked 10 questions and will gaze at the moving answers that you want to select. The questions will only include neutral and personal questions where there is
          no right or wrong. E.g. “Which ice cream flavor would you choose? Vanilla, Chocolate or Strawberry.”
        </p>
        <p className="body">This study will take approximately 15 minutes.
        </p>
        <p className="body">After clicking Start, you will be led to the Consent Form first. We would then like to ask you to answer some demographic questions.
        </p>
        <button className="start-button" onClick={()=> setPage('consent')}>
            Start
        </button>
      </div>
    );
  }

  const Consent = () => {
    return (
      <div className='consent'>
          <Header></Header>
          <h1 className='title'>Consent Form: EyeVote Remote</h1>
          <ol className='body' style={{ listStyleType: "decimal" }}>
              <li>I am aware that the collection, processing and use of my data is voluntary. The study can be cancelled by me at any time without mentioning reasons and without causing meany disadvantages. In the event of cancellation, all data recorded of me will beirrevocably deleted.<p></p></li>
              <li>I agree that my following data are processed:
                  <ol style={{ listStyleType: "lower-latin" }} >
                      <li className='identLi'>demography (age in years, gender, education, job status, technical affinity)</li>
                      <li className='identLi'>experiences with and attitudes towards various types of technology</li>
                      <li className='identLi'>results from questionnaires on user experienced.video and audio recordings during study tasks</li>
                  </ol>
                  Your data will be needed to answer scientific research questions regarding technologyuse in virtual worlds and real-world public settings. The study is not intended to evaluateyou or your performance, but to help in designing usable valuable experiences.<p></p>
              </li>
              <li>
              I have been informed that the code I have selected will only be used to merge the datafrom the different parts of the study. My name is neither associated with the collecteddata nor with the study code.<p></p>
              </li>
              <li>
              I agree that my data will be collected, processed, used and stored by Ludwig-Maximilians- Universität (LMU) Munich and Bundeswehr University Munich for thefollowing purposes:
                  <ol style={{ listStyleType: "lower-latin" }}>
                      <li className='identLi'>I agree that the results and primary data of this study may be published by the LMUMunich and Bundeswehr University Munich as a scientific publication. The data ispublished completely anonymously, i.e., the collected data cannot be related torespective participants.</li>
                      <li className='identLi'>The anonymized data is stored for an indefinite period of time.</li>
                  </ol>
                  <p></p>
              </li>
              <li>I have been informed that my personal data collected in the context of the abovepurposes will be processed in compliance with the General Data Protection Regulation(GDPR and BayDSG).<p></p></li>
              <li>Furthermore, I have been informed that I can amend the given consent without statingany reasons with effect for the future or revoke it completely. I can send my declaration of cancellation by stating the study title "Remote Eye-Tracking Studies: challenges and opportunities of conducting eye-tracking studies out of the lab" and my study code by post or e-mail to
                  <p>khanh.huynh@campus.lmu.de</p>
                  In addition, after taking part in the study until XXX, I have the opportunity to obtain the complete deletion of my data at LMU Munich by stating my study code, as long as the data can still be assigned to this code.
                  <p>I have understood that my data will be completely anonymized after this deadline and thus cannot be deleted.</p><p></p>
              </li>
              <li>
              I am aware that according to the General Data Protection Regulation (GDPR) I have aright to information about my personal data stored at XXX For this purpose, I was alsogiven an information sheet on data protection with further information. Because of thisinformation and any further explanations, I can contact the study supervisor by post ore-mail
                  <p>Phuong Khanh Huynh</p>
                  <p>khanh.huynh@campus.lmu.de</p>
                  <p></p>
              </li>
          </ol>
          <button className='button' onClick={()=>setPage('questions')}>
        I understand
        </button>
          <p className="note">*By pressing “I understand”, I assure that I have read and understood the above consent and thus was informed about my rights. I certify that I agree to the processing of my data
              by the LMU Munich and Bundeswehr University Munich.
          </p>
      </div>
  )
  }

  const Questions = () => {
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
            <button className="button"  onClick={toPage('eyevote')}>Start</button>
        </div>
    )
}

  return (
    <div className="App">
       {content()}
    </div>
  );
}

export default App;
