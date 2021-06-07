import React, { useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import './History.css'
import { motion } from "framer-motion";

export default function History() {


    const [current, setCurrent] = useState(1);
    const [side, setSide] = useState('');
    const length = 2

    const nextSlide = () => {
        setSide('right');
        setCurrent(current === length ? 1 : current + 1);
    };

    const prevSlide = () => {
        setSide('left');
        setCurrent(current === 1 ? length : current - 1);
    }

    //animation

    const titleAnim = {
        hidden: {
            y: -100, opacity: 0
        },
        visible: {
            y: 0, opacity: 1,
            transition: { delay: 0.6, duration: 0.6 }
        }
    }

    const descriptionAnim = {
        hidden: {
            y: 50, opacity: 0
        },
        visible: {
            y: 0, opacity: 1,
            transition: { duration: 0.8, delay: 0.8 }
        }
    }

    const descriptionLeftAnim = {
        hidden: {
            x: 50, opacity: 0
        },
        visible: {
            x: 0, opacity: 1,
            transition: { duration: 0.3, delay: 0.3 }
        }
    }
    const descriptionRightAnim = {
        hidden: {
            x: -50, opacity: 0
        },
        visible: {
            x: 0, opacity: 1,
            transition: { duration: 0.3, delay: 0.3 }
        }
    }

    const descriptionBottomAnim = {
        hidden: {
            y: 50, opacity: 0
        },
        visible: {
            y: 0, opacity: 1,
            transition: { duration: 0.3, delay: 0.3 }
        }
    }

    const arrowAnim = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: { duration: 0.8, delay: 0.8 }
        }
    }

    const indicatorAnim = {
        hidden: {
            y: 150, opacity: 0
        },
        visible: {
            y: 0, opacity: 1,
        }
    }

    return (
        <div id="hist" className="carousel">
            <motion.a variants={arrowAnim} initial='hidden' animate='visible'>
                <IoIosArrowBack className='left-arrow' onClick={prevSlide} />
            </motion.a>
            <motion.a variants={arrowAnim} initial='hidden' animate='visible'>
                <IoIosArrowForward className='right-arrow' onClick={nextSlide} />
            </motion.a>
            <motion.h1 variants={titleAnim} initial='hidden' animate='visible' className="section-title">
                <span>Crystal System</span></motion.h1>
            <div className="container">
                <div variants={descriptionAnim} initial='hidden' animate='visible' className="carousel-inner ">
                    {current === 1 &&
                        <motion.p variants={side === '' ? descriptionAnim :
                            (side === 'right' ? descriptionRightAnim :
                                (side === 'left' ? descriptionLeftAnim : descriptionBottomAnim))}
                            initial='hidden' animate='visible' className="hist-row">
                            Founded in 2001 in Bucharest, Crystal System is today a strategic IT partner to some of the largest European companies. Over the years we have developed a wide knowledge in the fields of SAP technologies, Business Intelligence, Web & Cloud & Mobile technologies, and our experts carry out Consultancy, Design, Implementation and Maintenance of IT systems, delivering high quality and time/cost effective outsourcing services.
                            With Software Factories located in Romania and Moldova, we have direct access to one of the world’s highest and finest concentrations of IT specialists. Indeed, this region of East-Europe has a technology culture and shows a well-established University network strongly focused on computer science, engineering, mathematics and statistics.
                        </motion.p>
                    }
                    {current === 2 &&
                        <motion.p variants={side === '' ? descriptionAnim :
                            (side === 'right' ? descriptionRightAnim :
                                (side === 'left' ? descriptionLeftAnim : descriptionBottomAnim))}
                            initial='hidden' animate='visible' className="hist-row">
                            Over the years, we have developed an original hiring approach based on partnerships with leading universities. We have invested a lot to sustain university course programs (both bachelor and master) that attract the best talented persons from which we select and hire our personnel. The high level talent of the local IT specialists provides our company with the unique capability of accelerating results and cutting costs while maintaining the state‐of‐the art quality required by market leaders.
                            By focalizing on quality through people, Crystal System has gained competitive edge through extensive international experience in offering value added IT outsourcing consulting and development services.
                        </motion.p>
                    }
                </div>
            </div>

            <ol className="carousel-indicators">
                <motion.a variants={indicatorAnim} initial='hidden' animate='visible' transition={{ delay: 0.3, duration: 0.3 }}>
                    <li className={current === 1 ? "active" : null} onClick={() => { setCurrent(1); current === 2 && setSide('bottom'); }}></li>
                </motion.a>
                <motion.a variants={indicatorAnim} initial='hidden' animate='visible' transition={{ delay: 0.6, duration: 0.6 }}>
                    <li className={current === 2 ? "active" : null} onClick={() => { setCurrent(2); current === 1 && setSide('bottom'); }}></li>
                </motion.a>
            </ol>

        </div>
    )
}

