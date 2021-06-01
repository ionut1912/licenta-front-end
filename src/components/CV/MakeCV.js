import React, { useState, useEffect, useRef } from 'react'
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
import Notification from '../Notification'
import './MakeCV.css'


export default function MakeCV(props) {

    const formRef = useRef();

    const [nextStateForm, setNextStateForm] = useState(1);
    const [stateForm, setStateForm] = useState(1);

    const [openPopupView, setOpenPopupView] = useState(false);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

    const [viewCv, setViewCv] = useState(false);
    const [editCv, setEditCv] = useState(false);

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

    function addSkill(newSkill) {
        setCv(prevInfo => {
            return {
                ...prevInfo,
                skills: [...prevInfo.skills, newSkill]
            }
        });
    }

    const sendAndNextStep = () => {
        if (formRef.current) {
            formRef.current.handleSubmit();
        }
    }

    /***********ADD AND EDIT CV**************/

    function reset() {
        setCv({
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
        })
        setStateForm(1);
    }

    function addCVToDB(theCv) {
        setViewCv(true);
        setOpenPopupView(true);
    }

    function format(date) {
        return new Intl.DateTimeFormat("fr-CA", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).format(new Date(date));
    }

    useEffect(() => {
        if (props.itemForEdit !== '' && props.itemForEdit !== undefined) {
            setEditCv(true);
            setCv({
                id: props.itemForEdit.id,
                first_name: props.itemForEdit.first_name,
                last_name: props.itemForEdit.last_name,
                email: props.itemForEdit.email,
                phone: props.itemForEdit.phone,
                city: props.itemForEdit.city,
                nationality: props.itemForEdit.nationality,
                address: props.itemForEdit.address,
                dateOfBirth: props.itemForEdit.dateOfBirth !== null ? format(props.itemForEdit.dateOfBirth) : '',
                drivingLicence: props.itemForEdit.drivingLicence,
                linkedin: props.itemForEdit.linkedin,
                personalSite: props.itemForEdit.personalSite,
                personalDescription: props.itemForEdit.personalDescription !== null ? props.itemForEdit.personalDescription : { descriere: '' },
                works: props.itemForEdit.works,
                educations: props.itemForEdit.educations,
                skills: props.itemForEdit.skills,
                languages: props.itemForEdit.languages,
                hobbys: props.itemForEdit.hobbys,
                projects: props.itemForEdit.projects
            })
        }

    }, [props.itemForEdit])

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

                    <PersonalInfoSection formRef={formRef} changeState={setStateForm} cv={cv} setCv={setCv} nextStateForm={nextStateForm} addCv={props.addCv} />

                </div>

                {/**********************************Experience********************************************************/}

                <div className="experience" style={{
                    display: stateForm !== 2 && 'none'
                }}>

                    <h3>Experiences</h3>
                    <hr className="hr" />
                    <PersonalDescription cv={cv} setCv={setCv} editCv={editCv} />
                    <WorkSection cv={cv} setCv={setCv} editCv={editCv} />
                    <EducationSection cv={cv} setCv={setCv} editCv={editCv} />
                    <SkillSection data={cv} setData={setCv} addSkill={addSkill} editCv={editCv} />
                    <LanguageSection cv={cv} setCv={setCv} editCv={editCv} />
                    <HobbySection cv={cv} setCv={setCv} editCv={editCv} />
                    <ProjectSection cv={cv} setCv={setCv} editCv={editCv} />


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
                    <PDF cv={cv} viewCv={viewCv} showButton={props.addCv} setOpenPopup={setOpenPopupView} setNotify={setNotify} reset={reset} editCv={editCv} setEditCv={setEditCv} />
                </ViewPopup>

                <Notification
                    notify={notify}
                    setNotify={setNotify}
                />

            </div>
        </div>
    )
}
