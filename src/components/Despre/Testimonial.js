import React, { useState } from 'react';
import { Modal } from '../Modal';
import './Testimonial.css';

function Testimonial({ data }) {

    const [show, setShow] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);

    const closeModalHandler = () => setShow(false);

    return (
        <div className="testimonials">
            {show && <Modal show={show} close={closeModalHandler} data={currentItem} />}
            <div className="inner">
                <div className="row">
                    {data.map((item, index) => {
                        return (
                            <div className="col" key={index}>
                                <div className={item.img == null ? "testimonial bg-yellow" : "testimonial"} >
                                    {item.img == null ? (
                                        <div>
                                            <div className="name">{item.numeJob}</div>
                                            <p>Location: {item.locatie}</p>
                                            <button className="btn btn-primary btn-lg " onClick={() => { setShow(true); setCurrentItem(item); }}>See more details</button>

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
        </div>
    )
}

export default Testimonial;
