import React, { useState } from 'react'
import Aplicare from './Joburi/Aplicare';
import './Modal.css';

export const Modal = ({ show, close, data, buttons }) => {

    const [showApplay, setShowApplay] = useState(false);
    const [messageAplicare, setMessageAplicare] = useState("");
    const [stateAplicare, setStateAplicare] = useState(false);

    return (
        <div>
            <div className="back-drop" style={{
                transform: show ? 'translateY(0vh)' : 'translateY(-100vh)',
            }} onClick={close} />

            <div className="modal-wrapper" style={{
                transform: show ? 'translateY(0vh)' : 'translateY(-100vh)',
                top: data.locatie != null ? '15%' : '90%',
            }} >
                <div className="modal-header">
                    <div className="job-description">
                        {data.numeJob != null ? <h2>{data.numeJob}</h2> : <h2>{data.name}</h2>}
                        {data.locatie != null ? <p>{data.locatie}</p> : null}
                    </div>
                    <span className="close-modal-btn" onClick={close} >x</span>
                </div>
                <div className="modal-content">
                    {showApplay === false ? (
                        <div className="modal-body">
                            {data.locatie != null ? (
                                <div className="content">
                                    <h4>Job Description</h4>
                                    <p>{data.descriere}</p>
                                    <h4>Required Skill Sets</h4>
                                    <ul >
                                        {data.skills.sort((a, b) => a.id - b.id).map((item, nr) => {
                                            return (
                                                <li key={nr}><span>-{'>'} </span>{item.skill}</li>
                                            );
                                        })}
                                    </ul>
                                    <h4>Personal Attributes</h4>
                                    <ul>
                                        {data.atributePersonale.sort((a, b) => a.id - b.id).map((item, nr) => {
                                            return (
                                                <li key={nr}><span>-{'>'} </span>{item.atribut}</li>
                                            );
                                        })}
                                    </ul>
                                    <h4>Further Details</h4>
                                    <ul>
                                        {data.moreDetails.sort((a, b) => a.id - b.id).map((item, nr) => {
                                            return (
                                                <li key={nr}><span>-{'>'} </span>{item.detaliu}</li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            ) : (
                                <div >
                                    {data.descriere != null ? (
                                        <div>
                                            <h4>Description</h4>
                                            <p>{data.descriere}</p>
                                        </div>
                                    ) : null}

                                    {data.category.map((item, nr) => {
                                        return (
                                            <ul key={nr}>
                                                <h4>{item.title}</h4>
                                                <li >{item.detalii}</li>
                                            </ul>
                                        );
                                    })}
                                </div>
                            )
                            }

                        </div>
                    ) : (
                        messageAplicare !== "" ? <h1 style={{ padding: "50px", fontSize: "40px" }} className={stateAplicare === true ? "text-success" : "text-danger"}>{messageAplicare}</h1> :
                            <Aplicare showDetails={setShowApplay} close={close} idJob={data.id} setMessage={setMessageAplicare} state={setStateAplicare} />

                    )}
                    {data.locatie != null && buttons !== false ? (
                        <div className="modal-footer">
                            <button className="btn-cancel" onClick={close}>Close</button>
                            <button className="btn-apply" onClick={() => { setShowApplay(!showApplay); setMessageAplicare("") }}>{showApplay === false ? "Apply now" : "See details again"}</button>
                        </div>
                    ) : null}
                </div>


            </div>


        </div>
    );
};



