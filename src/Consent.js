import React from 'react'
import Header from './Header'
import './Consent.css'
import {
    Link
  } from "react-router-dom";

const Consent = () => {
    return (
        <div className='consent'>
            <Header></Header>
            <h1 className='title'>Consent Form: EyeVote Remote</h1>
            <ol className='body'>
                <li>I am aware that the collection, processing and use of my data is voluntary. The study can be cancelled by me at any time without mentioning reasons and without causing meany disadvantages. In the event of cancellation, all data recorded of me will beirrevocably deleted.<p></p></li>
                <li>I agree that my following data are processed:
                    <ol style={{ listStyleType: "lower-latin" }}>
                        <li>demography (age in years, gender, education, job status, technical affinity)</li>
                        <li>experiences with and attitudes towards various types of technology</li>
                        <li>results from questionnaires on user experienced.video and audio recordings during study tasks</li>
                    </ol>
                    Your data will be needed to answer scientific research questions regarding technologyuse in virtual worlds and real-world public settings. The study is not intended to evaluateyou or your performance, but to help in designing usable valuable experiences.<p></p>
                </li>
                <li>
                I have been informed that the code I have selected will only be used to merge the datafrom the different parts of the study. My name is neither associated with the collecteddata nor with the study code.<p></p>
                </li>
                <li>
                I agree that my data will be collected, processed, used and stored by Ludwig-Maximilians- Universität (LMU) Munich and Bundeswehr University Munich for thefollowing purposes:
                    <ol style={{ listStyleType: "lower-latin" }}>
                        <li>I agree that the results and primary data of this study may be published by the LMUMunich and Bundeswehr University Munich as a scientific publication. The data ispublished completely anonymously, i.e., the collected data cannot be related torespective participants.</li>
                        <li>The anonymized data is stored for an indefinite period of time.</li>
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
            <button className='button'><Link to="/questions">I understand</Link></button>
            <p className="note">*By pressing “I understand”, I assure that I have read and understood the above consent and thus was informed about my rights. I certify that I agree to the processing of my data
                by the LMU Munich and Bundeswehr University Munich.
            </p>
        </div>
    )
}

export default Consent