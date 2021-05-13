import React, { useState } from 'react';
import ViewPopup from '../ViewPopup';
import JobView from '../Joburi/JobView'
import './Testimonial.css';

export default function Testimonial({ data, filter }) {

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
        <div className="testimonials">
            <div className="inner">
                <div className="row">
                    {data.filter(element => {
                        return (filter === undefined ? element : (filter === "All" ? data : filter.toLowerCase().startsWith(element.locatie.toLowerCase())))
                    }).map((item, index) => {
                        return (
                            <div className="col" key={index}>
                                <div className={item.img == null ? "testimonial bg-yellow col-shadow" : "testimonial col-shadow"} >
                                    {item.img == null ? (
                                        <div>
                                            <div className="name">{item.numeJob}</div>
                                            <p>Location: {item.locatie}</p>
                                            <p>Job type: {item.jobType}</p>
                                            <p style={{color:'#f00946'}}>Data limita: {format(item.dataMaxima)}</p>
                                            <button className="btn btn-primary btn-lg " onClick={() => { setOpenPopupView(true); setCurrentItem(item); }}>See more details</button>

                                        </div>
                                    ) : (
                                        <div>
                                            <img src={item.img} alt={"img " + index} />
                                            <div className="name">{item.name}</div>
                                            <div className="stars">
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                            </div>
                                            <p>{item.p}</p>
                                        </div>
                                    )
                                    }
                                </div>
                            </div>
                        )
                    })}
                </div>
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

