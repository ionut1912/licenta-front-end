import React, { useState } from 'react'
import Aplicare from '../Joburi/Aplicare'
import jobService from '../../services/job.service'
import '../ViewPopup.css'

export default function JobView(props) {

    const [showApplay, setShowApplay] = useState(false);

    const close = () => {
        props.setOpenPopup(false)
    }

    function addEditJob() {

        if (props.editJob === false) {
            jobService.addJob(props.recordForView).then(
                response => {
                    props.setNotify({
                        isOpen: true,
                        message: 'Job added with success!',
                        type: 'success'
                    });
                    props.reset();
                    close();
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    props.setNotify({
                        isOpen: true,
                        message: resMessage,
                        type: 'error'
                    })
                    close();
                }
            )
        } else {
            jobService.updateJob(props.recordForView).then(
                response => {
                    props.setNotify({
                        isOpen: true,
                        message: 'Job updated with success!',
                        type: 'success'
                    });
                    props.reset();
                    props.setEditJob(false);
                    close();
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    props.setNotify({
                        isOpen: true,
                        message: resMessage,
                        type: 'error'
                    })
                    close();
                }
            )
        }

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
                <Aplicare idJob={props.recordForView.id} setNotify={props.setNotify} state={setShowApplay} />
            )}
            {props.buttons !== false ? (
                <div className="modal-footer">
                    <button className="btn btn-cancel" onClick={close}>Close</button>
                    <button className="btn btn-apply" onClick={() => setShowApplay(!showApplay)}>{showApplay === false ? "Apply now" : "See details"}</button>
                </div>
            ) : null}
            {props.buttonsAddJob !== false ? (
                <div className="modal-footer">
                    <button className="btn btn-cancel" onClick={close}>Close</button>
                    <button className="btn btn-apply" onClick={addEditJob} >{props.editJob === false ? "Add job" : "Update job"}</button>
                </div>
            ) : null}
        </div>
    )
}

