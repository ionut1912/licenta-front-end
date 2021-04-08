import React, { useState } from 'react'
import PersonalInfoSection from './PersonalInfoSection'
import PDF from './PDF'
import './MakeCV.css'
import WorkSection from './WorkSection'
import EducationSection from './EducationSection'
import SkillSection from './SkillSection'
import LanguageSection from './LanguageSection'
import HobbySection from './HobbySection'
import ProjectSection from './ProjectSection'

function MakeCV() {

    const [valid, setValid] = useState(false);

    const [stateForm, setStateForm] = useState(1);

    const [personalInfo, setPersonalInfo] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        city: '',
        nationality: '',
        address: '',
        dateOfBirth: '',
        drivingLicence: '',
        linkedin: '',
        personalSite: ''
    });
    const [works, setWorks] = useState([]);
    const [educations, setEducations] = useState([]);
    const [skills, setSkills] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [hobbys, setHobbys] = useState([]);
    const [projects, setProjects] = useState([]);

    function addWork(newWork) {
        setWorks(prevWorks => {
            return [...prevWorks, newWork];
        });
    }

    function addEducation(newEducation) {
        setEducations(prevEducations => {
            return [...prevEducations, newEducation];
        });
    }

    function addSkill(newSkill) {
        setSkills(prevSkills => {
            return [...prevSkills, newSkill];
        });
    }

    function addLanguage(newLanguage) {
        setLanguages(prevLanguages => {
            return [...prevLanguages, newLanguage];
        });
    }

    function addHobby(newHobby) {
        setHobbys(prevHobbys => {
            return [...prevHobbys, newHobby];
        });
    }

    function addProject(newProject) {
        setProjects(prevProjects => {
            return [...prevProjects, newProject];
        });
    }



    return (
        <div style={{ background: '#f1f1f1', height: '100%', padding: '50px' }}>

            <div className="container proggres-bar">

                <ul className="progressbar">
                    <li className="active" onClick={() => setStateForm(1)}>Personal</li>
                    <li className={(stateForm === 2 || stateForm === 3) ? "active" : null} onClick={() => { valid && setStateForm(2) }}>Experiences</li>
                    <li className={stateForm === 3 ? "active" : null} onClick={() => { valid && setStateForm(3) }}>Finish</li>
                </ul>

                {/**********************************PersonalDetails********************************************************/}

                <div className="personalDetails" style={{
                    display: stateForm !== 1 && 'none'
                }}>
                    <h3>Personal details</h3>
                    <hr className="hr" />

                    <PersonalInfoSection changeState={setStateForm} changePersonalInfo={setPersonalInfo} setValid={setValid} />

                </div>

                {/**********************************Experience********************************************************/}

                <div className="experience" style={{
                    display: stateForm !== 2 && 'none'
                }}>

                    <h3>Experiences</h3>
                    <hr className="hr" />

                    <WorkSection works={works} addWork={addWork} setWorks={setWorks} />
                    <EducationSection educations={educations} addEducation={addEducation} setEducations={setEducations} />
                    <SkillSection skills={skills} addSkill={addSkill} setSkills={setSkills} />
                    <LanguageSection languages={languages} addLanguage={addLanguage} setLanguages={setLanguages} />
                    <HobbySection hobbys={hobbys} addHobby={addHobby} setHobbys={setHobbys} />
                    <ProjectSection projects={projects} addProject={addProject} setProjects={setProjects} />


                    <div className="two-btn">
                        <button className="btn btn-primary btn-prev" onClick={() => setStateForm(1)}><i className="fa fa-arrow-left" aria-hidden="true"> Previous</i></button>

                        <button type="submit" className="btn btn-primary" onClick={() => setStateForm(3)}>Next  <i className="fa fa-arrow-right" aria-hidden="true"></i></button>
                    </div>
                </div>

                {/**********************************Finish form********************************************************/}

                <div className="finish" style={{
                    display: stateForm !== 3 && 'none'
                }}>
                    <PDF personalInfo={personalInfo} works={works} educations={educations} skills={skills} languages={languages} hobbys={hobbys} projects={projects} />

                    {/* 
                    <div className="two-btn">
                        <button className="btn btn-primary btn-prev" onClick={() => setStateForm(2)}><i className="fa fa-arrow-left" aria-hidden="true"> Previous</i></button>

                        <button type="submit" className="btn btn-primary">Export pdf</button>
                    </div> */}

                </div>


            </div>
        </div>
    )
}

export default MakeCV
