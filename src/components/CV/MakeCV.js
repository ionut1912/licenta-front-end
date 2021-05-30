import React, { useState, useRef } from 'react'
import PersonalInfoSection from './PersonalInfoSection'
import WorkSection from './WorkSection'
import PersonalDescription from './PersonalDescription'
import EducationSection from './EducationSection'
import SkillSection from './SkillSection'
import LanguageSection from './LanguageSection'
import HobbySection from './HobbySection'
import ProjectSection from './ProjectSection'
import ViewPopup from '../ViewPopup'
import PDF from './PDF'
import './MakeCV.css'


export default function MakeCV(props) {

    const formRef = useRef();

    const [nextStateForm, setNextStateForm] = useState(1);

    const [stateForm, setStateForm] = useState(1);

    const [openPopupView, setOpenPopupView] = useState(false);

    const [personalInfo, setPersonalInfo] = useState({
        img_cv: '',
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

    const [personalDescription, setPersonalDescription] = useState({ descriere: '' })

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

    const sendAndNextStep = () => {
        if (formRef.current) {
            formRef.current.handleSubmit();
        }
    }

    function addCVToDB() {
        console.log("test");
    }


    return (
        <div style={{ padding: '30px' }}>
            <div className="container" style={stateForm === 3 ? { maxWidth: '720px' } : null}>
                {props.addCv === true ? null : (
                    <ul className="progressbar" style={{ justifyContent: "center" }}>
                        <li className="active" onClick={() => { setStateForm(1); setNextStateForm(1); }}>Personal</li>
                        <li className={(stateForm === 2) ? "active" : null} onClick={() => { setNextStateForm(2); sendAndNextStep(); }}>Experiences</li>
                    </ul>
                )}

                {/**********************************PersonalDetails********************************************************/}

                <div className="personalDetails" style={{
                    display: stateForm !== 1 && 'none'
                }}>
                    <h3>Personal details</h3>
                    <hr className="hr" />

                    <PersonalInfoSection formRef={formRef} changeState={setStateForm} changePersonalInfo={setPersonalInfo} nextStateForm={nextStateForm} addCv={props.addCv} />

                </div>

                {/**********************************Experience********************************************************/}

                <div className="experience" style={{
                    display: stateForm !== 2 && 'none'
                }}>

                    <h3>Experiences</h3>
                    <hr className="hr" />
                    <PersonalDescription setDescription={setPersonalDescription} />
                    <WorkSection works={works} addWork={addWork} setWorks={setWorks} />
                    <EducationSection educations={educations} addEducation={addEducation} setEducations={setEducations} />
                    <SkillSection skills={skills} addSkill={addSkill} setSkills={setSkills} />
                    <LanguageSection languages={languages} addLanguage={addLanguage} setLanguages={setLanguages} />
                    <HobbySection hobbys={hobbys} addHobby={addHobby} setHobbys={setHobbys} />
                    <ProjectSection projects={projects} addProject={addProject} setProjects={setProjects} />


                    <div className="two-btn">
                        <button className="btn btn-primary btn-prev" onClick={() => setStateForm(1)}><i className="fa fa-arrow-left" aria-hidden="true"> Previous</i></button>

                        {props.addCv === true ? (
                            <button type="submit" className="btn btn-primary" onClick={() => addCVToDB()}>Add CV</button>
                        ) : (
                            <button type="submit" className="btn btn-primary" onClick={() => setOpenPopupView(true)}>Finish </button>
                        )}
                    </div>
                </div>

                <ViewPopup
                    cvMode={true}
                    openPopup={openPopupView}
                    setOpenPopup={setOpenPopupView}>
                    <PDF personalInfo={personalInfo} personalDescription={personalDescription} works={works} educations={educations} skills={skills} languages={languages} hobbys={hobbys} projects={projects} />
                </ViewPopup>

            </div>
        </div>
    )
}
