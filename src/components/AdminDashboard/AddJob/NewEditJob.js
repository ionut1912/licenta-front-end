import React, { useState } from 'react'
import SkillSection from '../../CV/SkillSection'
import AtributSection from './AtributSection'
import DetaliuSection from './DetaliuSection'
import StaticInfoSection from './StaticInfoSection';
import JobView from '../../Joburi/JobView'
import ViewPopup from '../../ViewPopup'
import Notification from '../Notification'


function NewEditJob(props) {

    const [stateForm, setStateForm] = useState(1);
    const [openPopupView, setOpenPopupView] = useState(false);
    const [recordForView, setRecordForView] = useState("");
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

    const [staticInfo, setStaticInfo] = useState({
        nume_job: '',
        locatie: '',
        descriere: '',
        last_date: ''
    });

    const [detalii, setDetalii] = useState([]);
    const [atributePersonale, setAtributePersonale] = useState([]);
    const [skills, setSkills] = useState([]);

    const [jobInfo, setJobInfo] = useState({
        numeJob: '',
        locatie: '',
        descriere: '',
        skills: [],
        atributePersonale: [],
        moreDetails: []
    })

    function addDetaliu(newDetaliu) {
        setDetalii(prevDetails => {
            return [...prevDetails, newDetaliu];
        });
    }

    function addAtributPersonal(newAtribute) {
        setAtributePersonale(prevAtributes => {
            return [...prevAtributes, newAtribute];
        });
    }

    function addSkill(newSkill) {
        setSkills(prevSkills => {
            return [...prevSkills, newSkill];
        });
    }

    function reset() {
        setStaticInfo({
            nume_job: '',
            locatie: '',
            descriere: '',
            last_date: ''
        });
        setDetalii([]);
        setAtributePersonale([]);
        setSkills([]);
        setStateForm(1);
    }

    function handleSubmit() {
        setJobInfo({
            numeJob: staticInfo.nume_job,
            locatie: staticInfo.locatie,
            descriere: staticInfo.descriere,
            atributePersonale: atributePersonale,
            skills: skills,
            moreDetails: detalii
        })
        setRecordForView(jobInfo);
        setOpenPopupView(true);
    }

    return (
        <div className={props.sideState === true && window.innerWidth > 960 ? "dash-on dash-content" : "dash-content"}>
            <div className="container">
                <div className="addJob" >
                    <h3>Job information</h3>
                    <hr className="hr" />
                    <div style={{
                        display: stateForm !== 1 && 'none'
                    }}>
                        <StaticInfoSection changeState={setStateForm} staticInfo={staticInfo} setStaticInfo={setStaticInfo} />
                    </div>

                    <div style={{
                        display: stateForm !== 2 && 'none'
                    }}>
                        <SkillSection skills={skills} addSkill={addSkill} setSkills={setSkills} />
                        <AtributSection atributePersonale={atributePersonale} setAtributePersonale={setAtributePersonale} addAtributPersonal={addAtributPersonal} />
                        <DetaliuSection detalii={detalii} setDetalii={setDetalii} addDetaliu={addDetaliu} />
                        <div className="two-btn">
                            <button className="btn btn-primary btn-prev" onClick={() => setStateForm(1)}><i className="fa fa-arrow-left" aria-hidden="true"> Previous</i></button>
                            <button type="submit" className="btn btn-primary" onClick={() => handleSubmit()}>Finish</button>
                        </div>
                    </div>
                </div>
            </div>

            <ViewPopup
                title={recordForView.numeJob}
                subTitle={recordForView.locatie}
                openPopup={openPopupView}
                setOpenPopup={setOpenPopupView}>
                <JobView recordForView={recordForView} buttons={false} buttonsAddJob={true} setOpenPopup={setOpenPopupView} setNotify={setNotify} reset={reset} />
            </ViewPopup>

            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </div>
    )
}

export default NewEditJob
