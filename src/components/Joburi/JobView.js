import React, { useState } from 'react'
import Aplicare from '../Joburi/Aplicare'
import '../ViewPopup.css'
import jobService from '../../services/job.service'

function JobView(props) {

    const [showApplay, setShowApplay] = useState(false);
    const [messageAplicare, setMessageAplicare] = useState("");
    const [stateAplicare, setStateAplicare] = useState(false);

    const close = () => {
        props.setOpenPopup(false)
    }
    function addNewJob() {
        console.log(props.recordForView)
        jobService.addJob(props.recordForView).then(
            response => {
                props.setNotify({
                    isOpen: true,
                    message: 'Job added with success!',
                    type: 'success'
                });
                props.reset();
                close();
            }
        );
    }
    return (
        <div className="modal-content">
            {showApplay === false ? (
                <div className="modal-body">
                    <div className="content">
                        <h4>Job Description</h4>
                        <p>{props.recordForView.descriere}</p>
                        {props.recordForView.skills.length === 0 ? null : (
                            <div>
                                <h4>Required Skill Sets</h4>
                                <ul >
                                    {props.recordForView.skills.sort((a, b) => a.id - b.id).map((item, nr) => {
                                        return (
                                            <li key={nr}><span>-{'>'} </span>{item.skill}</li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )}
                        {props.recordForView.atributePersonale.length === 0 ? null : (
                            <div>
                                <h4>Personal Attributes</h4>
                                <ul>
                                    {props.recordForView.atributePersonale.sort((a, b) => a.id - b.id).map((item, nr) => {
                                        return (
                                            <li key={nr}><span>-{'>'} </span>{item.atribut}</li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )}
                        {props.recordForView.moreDetails.length === 0 ? null : (
                            <div>
                                <h4>Further Details</h4>
                                <ul>
                                    {props.recordForView.moreDetails.sort((a, b) => a.id - b.id).map((item, nr) => {
                                        return (
                                            <li key={nr}><span>-{'>'} </span>{item.detaliu}</li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                messageAplicare !== "" ? <h1 style={{ padding: "50px", fontSize: "40px" }} className={stateAplicare === true ? "text-success" : "text-danger"}>{messageAplicare}</h1> :
                    <Aplicare showDetails={setShowApplay} close={close} idJob={props.recordForView.id} setMessage={setMessageAplicare} state={setStateAplicare} />

            )}
            {props.buttons !== false ? (
                <div className="modal-footer">
                    <button className="btn-cancel" onClick={close}>Close</button>
                    <button className="btn-apply" onClick={() => { setShowApplay(!showApplay); setMessageAplicare("") }}>{showApplay === false ? "Apply now" : "See details again"}</button>
                </div>
            ) : null}
            {props.buttonsAddJob !== false ? (
                <div className="modal-footer">
                    <button className="btn-cancel" onClick={close}>Close</button>
                    <button className="btn-apply" onClick={addNewJob} >Add job</button>
                </div>
            ) : null}
        </div>
    )
}

export default JobView
