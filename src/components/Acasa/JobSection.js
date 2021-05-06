import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import './JobSection.css'
import Aos from 'aos';
import "aos/dist/aos.css"


function InfoHome({
    lightBg, topLine, lightText, lightTextDesc, headline,
    description, buttonLabel, img, alt, imgStart
}) {
    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, [])
    return (
        <>
            <div className={lightBg ? 'home__hero-section' : 'home__hero-section grayBg'}>
                <div className="container">
                    <div className="row__item home__hero-row" data-aos="fade-left" data-aos-offset="500"
                        style={{ display: 'flex', flexDirection: imgStart === 'start' ? 'row-reverse' : 'row' }}>
                        <div className="col__item">
                            <div className="home__hero-text-wrapper">
                                <div className="top-line">{topLine}</div>
                                <h1 className={lightText ? 'heading' : 'heading dark'}>{headline}</h1>
                                <p className={lightTextDesc ? 'home__hero-subtitle' : 'home__hero-subtitle dark'}>{description}</p>
                                <Link to="/jobs">
                                    <button className="btn btn-primary btn-lg ">{buttonLabel}</button>
                                </Link>
                            </div>
                        </div>
                        <div className="col__item" data-aos="fade-left" data-aos-offset="500">
                            <div className="home__hero-img-wrapper">
                                <img src={img} alt={alt} className="home__hero-img" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InfoHome;
