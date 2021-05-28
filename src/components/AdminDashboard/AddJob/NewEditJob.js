import React, { useState, useEffect } from 'react'
import SkillSection from '../../CV/SkillSection'
import AtributSection from './AtributSection'
import DetaliuSection from './DetaliuSection'
import StaticInfoSection from './StaticInfoSection';
import JobView from '../../Joburi/JobView'
import ViewPopup from '../../ViewPopup'
import Notification from '../../Notification'
import '../../CV/MakeCV.css'


export default function NewEditJob(props) {

    const [stateForm, setStateForm] = useState(1);
    const [openPopupView, setOpenPopupView] = useState(false);
    const [recordForView, setRecordForView] = useState("");
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [editJob, setEditJob] = useState(false);

    const [staticInfo, setStaticInfo] = useState({
        nume_job: '',
        jobType: '',
        locatie: '',
        jobCategory: '',
        descriere: '',
        dataMaxima: ''
    });

    const [detalii, setDetalii] = useState([]);
    const [atributePersonale, setAtributePersonale] = useState([]);
    const [skills, setSkills] = useState([]);

    const [jobInfo, setJobInfo] = useState({
        numeJob: '',
        jobType: '',
        locatie: '',
        jobCategory: '',
        descriere: '',
        dataMaxima: '',
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
            jobType: '',
            locatie: '',
            jobCategory: '',
            descriere: '',
            dataMaxima: ''
        });
        setDetalii([]);
        setAtributePersonale([]);
        setSkills([]);
        setStateForm(1);
    }

    function handleSubmit() {
        setRecordForView(jobInfo);
        setOpenPopupView(true);
    }


    function format(date) {
        return new Intl.DateTimeFormat("fr-CA", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).format(new Date(date));
    }

    function setData(values) {

        setEditJob(true);

        setStaticInfo({
            nume_job: values.numeJob,
            jobType: values.jobType,
            locatie: values.locatie,
            jobCategory: values.jobCategory,
            descriere: values.descriere,
            dataMaxima: format(values.dataMaxima)
        });


        setSkills(values.skills);
        setDetalii(values.moreDetails);
        setAtributePersonale(values.atributePersonale);

        setJobInfo({
            id: values.id,
            numeJob: values.numeJob,
            jobType: values.jobType,
            locatie: values.locatie,
            jobCategory: values.jobCategory,
            descriere: values.descriere,
            dataMaxima: values.dataMaxima,
            dataAdaugare: format(values.dataAdaugare),
            skills: values.skills,
            atributePersonale: values.atributePersonale,
            moreDetails: values.moreDetails
        })

    }

    useEffect(() => {
        if (props.itemForEdit !== '')
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
                        <SkillSection skills={skills} addSkill={addSkill} setSkills={setSkills} setJobInfo={setJobInfo} editJob={editJob} />
                        <AtributSection atributePersonale={atributePersonale} setAtributePersonale={setAtributePersonale} addAtributPersonal={addAtributPersonal} setJobInfo={setJobInfo} editJob={editJob} />
                        <DetaliuSection detalii={detalii} setDetalii={setDetalii} addDetaliu={addDetaliu} setJobInfo={setJobInfo} editJob={editJob} />
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
                <JobView recordForView={recordForView} buttons={false} buttonsAddJob={true} setOpenPopup={setOpenPopupView} setNotify={setNotify} reset={reset} editJob={editJob} setEditJob={setEditJob} />
            </ViewPopup>

            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </div>
    )
}

