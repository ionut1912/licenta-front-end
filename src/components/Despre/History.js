import React, { useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import './History.css'

export default function History() {


    const [current, setCurrent] = useState(1);
    const length = 2

    const nextSlide = () => {
        setCurrent(current === length ? 1 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 1 ? length : current - 1);
    }

    return (
        <div id="hist" className="carousel">
            <IoIosArrowBack className='left-arrow' style={{ top: '40%' }} onClick={prevSlide} />
            <IoIosArrowForward className='right-arrow' style={{ top: '40%' }} onClick={nextSlide} />
            <h1 className="section-title"><span>Crystal System</span></h1>
            <div className="container">
                <div className="carousel-inner ">
                    {current === 1 &&
                        <p className="hist-row">Founded in 2001 in Bucharest, Crystal System is today a strategic IT partner to some of the largest European companies. Over the years we have developed a wide knowledge in the fields of SAP technologies, Business Intelligence, Web & Cloud & Mobile technologies, and our experts carry out Consultancy, Design, Implementation and Maintenance of IT systems, delivering high quality and time/cost effective outsourcing services.
                        With Software Factories located in Romania and Moldova, we have direct access to one of the world’s highest and finest concentrations of IT specialists. Indeed, this region of East-Europe has a technology culture and shows a well-established University network strongly focused on computer science, engineering, mathematics and statistics.
                        </p>
                    }
                    {current === 2 &&
                        <p className="hist-row">Over the years, we have developed an original hiring approach based on partnerships with leading universities. We have invested a lot to sustain university course programs (both bachelor and master) that attract the best talented persons from which we select and hire our personnel. The high level talent of the local IT specialists provides our company with the unique capability of accelerating results and cutting costs while maintaining the state‐of‐the art quality required by market leaders.
                        By focalizing on quality through people, Crystal System has gained competitive edge through extensive international experience in offering value added IT outsourcing consulting and development services.
                        </p>
                    }
                </div>
            </div>

            <ol className="carousel-indicators">
                <li className={current === 1 ? "active" : null} onClick={()=> setCurrent(1)}></li>
                <li className={current === 2 ? "active" : null} onClick={()=> setCurrent(2)}></li>
            </ol>

        </div>
    )
}

