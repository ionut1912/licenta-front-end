import React, { useState } from 'react';
import ViewPopup from '../ViewPopup';
import JobView from '../Joburi/JobView'
import './JobList.css'

export default function JobList({ data, filter }) {

    const [openPopupView, setOpenPopupView] = useState(false);
    const [currentItem, setCurrentItem] = useState("");

    function format(date) {
        return new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }).format(new Date(date));
    }

    return (
        <div className="container-fluid">
            <div className="row justify-content-center" >

                {data.filter(element => {
                    return (filter === undefined ? element : (filter === "All" ? data : filter.toLowerCase().startsWith(element.locatie.toLowerCase())))
                }).map((item, index) => {
                    return (
                        <div key={index} style={{ padding: '20px' }}>
                            <div className="card col-shadow py-2 mb-3">

                                <div className="card-header border-0 mb-0" style={{ background: "#fff" }}>
                                    <div className="row justify-content-between">
                                        <div className="col-auto ">
                                            <h4><span className={item.jobType === "FULL_TIME" ? "badge badge-pill badge-success" : item.jobType === "PART_TIME" && "badge badge-pill badge-warning"}>
                                                {item.jobType === "FULL_TIME" ? "full-time" : item.jobType === "PART_TIME" && "part-time "}
                                            </span></h4>
                                        </div>
                                        <div className="col-auto">
                                            <h4> <span className="badge badge-pill badge-danger">{item.jobCategory}</span></h4>
                                        </div>
                                    </div>
                                </div>

                                <div className=" card-body text-center pb-0 mt-0 pt-3">
                                    <h5 className="card-title mb-0 font-weight-bold" >{item.numeJob}</h5>
                                    <p className="text-info my-1">
                                        <i className="fas fa-thumbtack" />{item.locatie}
                                    </p>
                                    <div className="d-flex row mb-0">
                                        <div className="mr-1 ml-1">
                                            <p className="text-muted">{item.descriere.substring(0, 150)}... </p>
                                        </div>
                                    </div>
                                    <p className="card-text text-danger"><i className="fas fa-calendar-alt" /> {format(item.dataAdaugare)} - {format(item.dataMaxima)}</p>
                                </div>

                                <div>
                                    <hr className="hl" />
                                </div>

                                <div className="card-footer border-0 text-center mx-auto" style={{ background: "#fff" }}>
                                    <h5 className="footer-text"> <span className="text-decoration-none" onClick={() => { setOpenPopupView(true); setCurrentItem(item); }}> VIEW JOB</span></h5>
                                </div>
                            </div>
                        </div>)
                })}
            </div>
            <ViewPopup
                title={currentItem.numeJob}
                subTitle={currentItem.locatie}
                openPopup={openPopupView}
                setOpenPopup={setOpenPopupView}>
                <JobView
                    recordForView={currentItem}
                    setOpenPopup={setOpenPopupView}
                    buttonsAddJob={false}
                />
            </ViewPopup>
        </div>
    )
}

