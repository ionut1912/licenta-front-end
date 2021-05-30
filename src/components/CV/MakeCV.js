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
import cvService from '../../services/cv-service'
import './MakeCV.css'


export default function MakeCV(props) {

    const formRef = useRef();

    const [nextStateForm, setNextStateForm] = useState(1);
    const [stateForm, setStateForm] = useState(1);
    const [openPopupView, setOpenPopupView] = useState(false);

    const [cv, setCv] = useState({
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
        personalSite: '',
        personalDescription: { descriere: '' },
        works: [],
        educations: [],
        skills: [],
        languages: [],
        hobbys: [],
        projects: []
    });

    function addWork(newWork) {
        setCv(prevInfo => {
            return {
                ...prevInfo,
                works: [...prevInfo.works, newWork]
            }
        });
    }

    function addEducation(newEducation) {
        setCv(prevInfo => {
            return {
                ...prevInfo,
                educations: [...prevInfo.educations, newEducation]
            }
        });
    }

    function addSkill(newSkill) {
        setCv(prevInfo => {
            return {
                ...prevInfo,
                skills: [...prevInfo.skills, newSkill]
            }
        });
    }

    function addLanguage(newLanguage) {
        setCv(prevInfo => {
            return {
                ...prevInfo,
                languages: [...prevInfo.languages, newLanguage]
            }
        });
    }

    function addHobby(newHobby) {
        setCv(prevInfo => {
            return {
                ...prevInfo,
                hobbys: [...prevInfo.hobbys, newHobby]
            }
        });
    }

    function addProject(newProject) {
        setCv(prevInfo => {
            return {
                ...prevInfo,
                projects: [...prevInfo.projects, newProject]
            }
        });
    }

    const sendAndNextStep = () => {
        if (formRef.current) {
            formRef.current.handleSubmit();
        }
    }

    function addCVToDB(theCv) {
        cvService.addCv(theCv).then(
            response => console.log(response)
        )
    }


    return (
        <div style={{ padding: '30px' }}>
            <div className="container">
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

                    <PersonalInfoSection formRef={formRef} changeState={setStateForm} setCv={setCv} nextStateForm={nextStateForm} addCv={props.addCv} />

                </div>

                {/**********************************Experience********************************************************/}

                <div className="experience" style={{
                    display: stateForm !== 2 && 'none'
                }}>

                    <h3>Experiences</h3>
                    <hr className="hr" />
                    <PersonalDescription setCv={setCv} addCv={props.addCv} />
                    <WorkSection cv={cv} setCv={setCv} addWork={addWork} addCv={props.addCv} />
                    <EducationSection cv={cv} setCv={setCv} addEducation={addEducation} addCv={props.addCv} />
                    <SkillSection data={cv} setData={setCv} addSkill={addSkill} addCv={props.addCv} />
                    <LanguageSection cv={cv} setCv={setCv} addLanguage={addLanguage} addCv={props.addCv} />
                    <HobbySection cv={cv} setCv={setCv} addHobby={addHobby} addCv={props.addCv} />
                    <ProjectSection cv={cv} setCv={setCv} addProject={addProject} addCv={props.addCv} />


                    <div className="two-btn">
                        <button className="btn btn-primary btn-prev" onClick={() => setStateForm(1)}><i className="fa fa-arrow-left" aria-hidden="true"> Previous</i></button>

                        {props.addCv === true ? (
                            <button type="submit" className="btn btn-primary" onClick={() => addCVToDB(cv)}>Add CV</button>
                        ) : (
                            <button type="submit" className="btn btn-primary" onClick={() => setOpenPopupView(true)}>Finish </button>
                        )}
                    </div>
                </div>

                <ViewPopup
                    cvMode={true}
                    openPopup={openPopupView}
                    setOpenPopup={setOpenPopupView}>
                    <PDF cv={cv} />
                </ViewPopup>

            </div>
        </div>
    )
}
