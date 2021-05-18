import React from 'react';
import './Testimonial.css';

export default function Testimonial({ data }) {

    return (
        <div className="testimonials">
            <div className="inner">
                <div className="row">
                    {data.map((item, index) => {
                        return (
                            <div className="col" key={index}>
                                <div className="testimonial col-shadow" >
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
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

