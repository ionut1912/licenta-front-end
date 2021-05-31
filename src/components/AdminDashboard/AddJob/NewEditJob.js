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

    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [editJob, setEditJob] = useState(false);

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
        setJobInfo(prevInfo => {
            return {
                ...prevInfo,
                moreDetails: [...prevInfo.moreDetails, newDetaliu]
            }
        })
    }

    function addAtributPersonal(newAtribute) {
        setJobInfo(prevInfo => {
            return {
                ...prevInfo,
                atributePersonale: [...prevInfo.atributePersonale, newAtribute]
            }
        })
    }

    function addSkill(newSkill) {
        setJobInfo(prevInfo => {
            return {
                ...prevInfo,
                skills: [...prevInfo.skills, newSkill]
            }
        })
    }

    function reset() {
        setJobInfo({
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
        setStateForm(1);
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

        setJobInfo({
            id: values.id,
            numeJob: values.numeJob,
            jobType: values.jobType,
            locatie: values.locatie,
            jobCategory: values.jobCategory,
            descriere: values.descriere,
            dataMaxima: format(values.dataMaxima),
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
                        <StaticInfoSection changeState={setStateForm} jobInfo={jobInfo} setJobInfo={setJobInfo} />
                    </div>

                    <div style={{
                        display: stateForm !== 2 && 'none'
                    }}>
                        <SkillSection data={jobInfo} setData={setJobInfo} addSkill={addSkill} editJob={editJob} />
                        <AtributSection jobInfo={jobInfo} setJobInfo={setJobInfo} addAtributPersonal={addAtributPersonal} editJob={editJob} forJob={true} />
                        <DetaliuSection jobInfo={jobInfo} setJobInfo={setJobInfo} addDetaliu={addDetaliu} editJob={editJob} />
                        <div className="two-btn">
                            <button className="btn btn-primary btn-prev" onClick={() => setStateForm(1)}><i className="fa fa-arrow-left" aria-hidden="true"> Previous</i></button>
                            <button type="submit" className="btn btn-primary" onClick={() => setOpenPopupView(true)}>Finish</button>
                        </div>
                    </div>
                </div>
            </div>

            <ViewPopup
                title={jobInfo.numeJob}
                subTitle={jobInfo.locatie}
                openPopup={openPopupView}
                setOpenPopup={setOpenPopupView}>
                <JobView recordForView={jobInfo} buttons={false} buttonsAddJob={true} setOpenPopup={setOpenPopupView} setNotify={setNotify} reset={reset} editJob={editJob} setEditJob={setEditJob} />
            </ViewPopup>

            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </div>
    )
}

