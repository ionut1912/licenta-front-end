import React, { useState, useEffect } from 'react'
import SkillSection from '../../CV/SkillSection'
import AtributSection from './AtributSection'
import DetaliuSection from './DetaliuSection'
import StaticInfoSection from './StaticInfoSection';
import JobView from '../../Joburi/JobView'
import ViewPopup from '../../ViewPopup'
import Notification from '../../Notification'


function NewEditJob(props) {

    const [stateForm, setStateForm] = useState(1);
    const [openPopupView, setOpenPopupView] = useState(false);
    const [recordForView, setRecordForView] = useState("");
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [editJob, setEditJob] = useState(false);

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
            setJobInfo(prevInfo => {
                return {
                    ...prevInfo,
                    moreDetails: [...prevDetails, newDetaliu]
                }
            })
            return [...prevDetails, newDetaliu];
        });


    }

    function addAtributPersonal(newAtribute) {
        setAtributePersonale(prevAtributes => {
            setJobInfo(prevInfo => {
                return {
                    ...prevInfo,
                    atributePersonale: [...prevAtributes, newAtribute]
                }
            })
            return [...prevAtributes, newAtribute];
        });
    }

    function addSkill(newSkill) {
        setSkills(prevSkills => {
            setJobInfo(prevInfo => {
                return {
                    ...prevInfo,
                    skills: [...prevSkills, newSkill]
                }
            })
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
        console.log(jobInfo);
        setRecordForView(jobInfo);
        setOpenPopupView(true);
    }

    function setData(values) {
        if (values !== '') {

            setEditJob(true);

            setStaticInfo({
                nume_job: values.numeJob,
                locatie: values.locatie,
                descriere: values.descriere,
                last_date: ''
            });

            setSkills(values.skills);
            setDetalii(values.moreDetails);
            setAtributePersonale(values.atributePersonale);

            setJobInfo({
                id: values.id,
                numeJob: values.numeJob,
                locatie: values.locatie,
                descriere: values.descriere,
                skills: values.skills,
                atributePersonale: values.atributePersonale,
                moreDetails: values.moreDetails
            })
        }

    }

    useEffect(() => {
        setData(props.itemForEdit)
    }, [])

    return (
        <div className={props.sideState === true && window.innerWidth > 960 ? "dash-on dash-content" : "dash-content"}>
            <div className="container">
                <div className="addJob" >
                    <h3>Job information</h3>
                    <hr className="hr" />
                    <div style={{
                        display: stateForm !== 1 && 'none'
                    }}>
                        <StaticInfoSection changeState={setStateForm} staticInfo={staticInfo} setStaticInfo={setStaticInfo} setJobInfo={setJobInfo} />
                    </div>

                    <div style={{
                        display: stateForm !== 2 && 'none'
                    }}>
                        <SkillSection skills={skills} addSkill={addSkill} setSkills={setSkills} setJobInfo={setJobInfo} />
                        <AtributSection atributePersonale={atributePersonale} setAtributePersonale={setAtributePersonale} addAtributPersonal={addAtributPersonal} setJobInfo={setJobInfo} />
                        <DetaliuSection detalii={detalii} setDetalii={setDetalii} addDetaliu={addDetaliu} setJobInfo={setJobInfo} />
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
                <JobView recordForView={recordForView} buttons={false} buttonsAddJob={true} setOpenPopup={setOpenPopupView} setNotify={setNotify} reset={reset} editJob={editJob} />
            </ViewPopup>

            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </div>
    )
}

export default NewEditJob
