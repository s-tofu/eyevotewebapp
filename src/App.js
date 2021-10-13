import React, {useState} from 'react'
import Header from './Header';
import './App.css'
import EyeVote from './EyeVote/Eyevote';
import {db} from './firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

function App() {
  
  const [log_id, setLog_id] = useState("");
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
      return <EyeVote props={log_id}/>
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
        <p className="body">For this study you will need:
        <ol className='body' style={{ listStyleType: "decimal" }}>
          <li>A desktop or a laptop with a webcam. A webcam is needed to track your eyes.</li>
          <li>Sit in a quiet and bright room.</li>
        </ol>
        </p>
        <p className="body">Once the study starts, you will be asked 10 questions and will gaze at the moving answers that you want to select. The questions will only include neutral and personal questions where there is
          no right or wrong. E.g. “Which ice cream flavor would you choose? Vanilla, Chocolate or Strawberry.” You will be able to undo your answer selection if you want to repeat the question.</p>
        <p className="body">This study will take approximately 15 minutes.
        </p>
        <p className="body">After clicking Continue, you will be led to the Consent Form first. We would then like to ask you to answer some demographic questions.
        </p>
        <button className="start-button" onClick={()=> setPage('consent')}>
            Continue
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
              <li>I am aware that the collection, processing and use of my data is voluntary. The study can be cancelled by me at any time without mentioning reasons and without causing meany disadvantages. In the event of cancellation, all data recorded of me will be irrevocably deleted.<p></p></li>
              <li>I agree that my following data are processed:
                  <ol style={{ listStyleType: "lower-latin" }} >
                      <li className='identLi'>demography (age in years, gender, education, job status, technical affinity)</li>
                      <li className='identLi'>experiences with and attitudes towards various types of technology</li>
                      <li className='identLi'>results from questionnaires on user experienced video and audio recordings during study tasks</li>
                  </ol>
                  Your data will be needed to answer scientific research questions regarding technology use in virtual worlds and real-world public settings. The study is not intended to evaluate you or your performance, but to help in designing usable valuable experiences.<p></p>
              </li>
              <li>
              I have been informed that the code I have selected will only be used to merge the data from the different parts of the study. My name is neither associated with the collected data nor with the study code.<p></p>
              </li>
              <li>
              I agree that my data will be collected, processed, used and stored by Ludwig-Maximilians- Universität (LMU) Munich and Bundeswehr University Munich for the following purposes:
                  <ol style={{ listStyleType: "lower-latin" }}>
                      <li className='identLi'>I agree that the results and primary data of this study may be published by the LMU Munich and Bundeswehr University Munich as a scientific publication. The data is published completely anonymously, i.e., the collected data cannot be related to respective participants.</li>
                      <li className='identLi'>The anonymized data is stored for an indefinite period of time.</li>
                  </ol>
                  <p></p>
              </li>
              <li>I have been informed that my personal data collected in the context of the above purposes will be processed in compliance with the General Data Protection Regulation(GDPR and BayDSG).<p></p></li>
              <li>Furthermore, I have been informed that I can amend the given consent without stating any reasons with effect for the future or revoke it completely. I can send my declaration of cancellation by stating the study title "Remote Eye-Tracking Studies: challenges and opportunities of conducting eye-tracking studies out of the lab" and my study code by post or e-mail to
                  <p>khanh.huynh@campus.lmu.de</p>
                  In addition, after taking part in the study until 01.01.2022, I have the opportunity to obtain the complete deletion of my data at LMU Munich by stating my study code, as long as the data can still be assigned to this code.
                  <p>I have understood that my data will be completely anonymized after this deadline and thus cannot be deleted.</p><p></p>
              </li>
              <li>
              I am aware that according to the General Data Protection Regulation (GDPR) I have a right to information about my personal data stored at XXX For this purpose, I was also given an information sheet on data protection with further information. Because of this information and any further explanations, I can contact the study supervisor by post ore-mail
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

  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [experience, setExperience] = useState("")
  const [remotestudy, setRemoteStudy] = useState("")
  const [screensize, setScreenSize] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    db.collection('studyfiles').add({
      timestamp: firebase.firestore.Timestamp.now(),
      age: age,
      gender: gender,
      experience: experience,
      remotestudy: remotestudy,
      screensize: screensize,
      start_time: firebase.firestore.Timestamp.now(),
      gazedata: [],
      labeldata: []
    })
    .then(function(docRef) {
      setLog_id(docRef.id)
      alert("Form has been submitted." + log_id);
    })
    .catch((error) => {
      alert(error.message);
    })

    setAge('')
    setGender('')
    setExperience('')
    setRemoteStudy('')
    setPage('eyevote')
  }
  const Questions = () => {
    return (
        <div className='Questions'>
            <Header></Header>
            <h1 className='title'>Demographic Questions</h1>
            <form className='body' onSubmit={handleSubmit}>
                <label>
                    <p className='question_title'>How old are you?</p>
                    <input type="text" age="age" value={age} onChange={(e) => setAge(e.target.value)}/>
                </label>
                <p></p>
                <label>
                <p className='question_title'>What is your gender?</p>
                    <input type="radio" value="Male" name="gender" onChange={(e) => setGender("Male")}/> Male<p></p>
                    <input type="radio" value="Female" name="gender" onChange={(e) => setGender("Female")}/> Female<p></p>
                    <input type="radio" value="Non-binary" name="gender" onChange={(e) => setGender("Non-binary")}/> Non-binary<p></p>
                    <input type="radio" value="Prefer-not-to-say" name="gender" onChange={(e) => setGender("Prefer not to say")}/> Prefer not to say<p></p>
                    Prefer to self describe: <input type="text" age="age" onChange={(e) => setGender(e.target.value)} />
                </label>
                <p></p>
                <label>
                <p className='question_title'>How much experience have you had with eye tracking?</p>
                    First time
                    <input type="radio" value="0" name="experience" onChange={(e) => setExperience("0")}/>
                    <input type="radio" value="1" name="experience" onChange={(e) => setExperience("1")}/>
                    <input type="radio" value="2" name="experience" onChange={(e) => setExperience("2")}/>
                    <input type="radio" value="3" name="experience" onChange={(e) => setExperience("3")}/>
                    <input type="radio" value="4" name="experience" onChange={(e) => setExperience("4")}/>
                    I am very experienced
                </label>
                <p></p>
                <label>
                <p className='question_title'>How many remote studies have you participated in?</p>
                    <input type="radio" value="0" name="remotestudy" onChange={(e) => setRemoteStudy("0")}/> 0<p></p>
                    <input type="radio" value="1-3" name="remotestudy" onChange={(e) => setRemoteStudy("1-3")}/> 1-3<p></p>
                    <input type="radio" value="More than 3" name="remotestudy" onChange={(e) => setRemoteStudy("More than 3")}/> More than 3<p></p>
                    <input type="radio" value="I don't know" name="remotestudy" onChange={(e) => setRemoteStudy("I don't know")}/> I don't know<p></p>
                </label>
                <label>
                    <p className='question_title'>Please state your screen size. E.g. 1920×1080, 1366×768 </p>
                    <input type="text" age="age" value={screensize} onChange={(e) => setScreenSize(e.target.value)}/>
                </label>
            <p><p className='question_title'>Reminder: 
            </p>
            <p>By clicking on "Start eye-tracking", we will start the Study. You will first be asked to calibrate the webcam eyetracker.
                Please follow the instructions of the calibration and continue with the study afterwards.</p>
            Once the study starts, you will be asked 10 questions and will gaze at the moving answers that you want to select. The questions will only include neutral and personal questions where there is
          no right or wrong. E.g. “Which ice cream flavor would you choose? Vanilla, Chocolate or Strawberry.” You will be able to undo your answer selection if you want to repeat the question.</p>
            <button className="button" type="submit">Start</button>
            </form>
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
