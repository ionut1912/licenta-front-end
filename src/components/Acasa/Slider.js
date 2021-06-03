import React, { useState } from 'react'
import './Slider.css';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { motion } from "framer-motion";

export default function Slider({ slides }) {

    const [current, setCurrent] = useState(0);
    const length = slides.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    }


    // animation
    const imgAnim = {
        hidden: {
            x: 150,
            opacity: 0
        },
        visible: {
            x: 0,
            opacity: 1,
            transition: { type: 'tween', delay: 0.7, duration: 0.7 }
        }
    }

    const redTextAnim = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: { type: 'tween', delay: 0.9, duration: 0.9 }
        }
    }

    const titleAnim = {
        hidden: {
            y: -150, opacity: 0
        },
        visible: {
            y: 0, opacity: 1,
            transition: { delay: 0.6, duration: 0.6 }
        }
    }

    const descriptionAnim = {
        hidden: {
            x: -150, opacity: 0
        },
        visible: {
            x: 0, opacity: 1,
            transition: { duration: 1, delay: 1 }
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
        <div className="carousel">
            <motion.a variants={arrowAnim} initial='hidden' animate='visible'>
                <IoIosArrowBack className='left-arrow' onClick={prevSlide} />
            </motion.a>
            <motion.a variants={arrowAnim} initial='hidden' animate='visible'>
                <IoIosArrowForward className='right-arrow' onClick={nextSlide} />
            </motion.a>
            <div className="carousel-inner container">
                {slides.map((slide, index) => {
                    return (
                        <div className="carousel-item active" key={index}>
                            {index === current &&
                                <div className="carousel-row" >

                                    <div className="carousel-col">
                                        <div className="infoDinamic-text-wrapper">
                                            <motion.div variants={redTextAnim} initial='hidden' animate='visible'
                                                className="static-text">CRYSTAL SYSTEM GROUP</motion.div>
                                            <motion.h1 variants={titleAnim} initial='hidden' animate='visible'>{slide.h1}</motion.h1>
                                            {slide.p.map((item, current) => {
                                                return (
                                                    <motion.p variants={descriptionAnim} initial='hidden' animate='visible'
                                                        key={current}>{item}</motion.p>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="carousel-col">
                                        <motion.img variants={imgAnim} initial="hidden" animate="visible"
                                            src={slide.image} alt={"img " + index} className="img" />
                                    </div>

                                </div>
                            }
                        </div>
                    )
                })}
            </div>

            <ol className="carousel-indicators">
                <motion.a variants={indicatorAnim} initial='hidden' animate='visible' transition={{ delay: 0.3, duration: 0.3 }} >
                    <li className={current === 0 ? "active" : null} onClick={() => setCurrent(0)}></li>
                </motion.a>

                <motion.a variants={indicatorAnim} initial='hidden' animate='visible' transition={{ delay: 0.6, duration: 0.6 }} >
                    <li className={current === 1 ? "active" : null} onClick={() => setCurrent(1)}></li>
                </motion.a>

                <motion.a variants={indicatorAnim} initial='hidden' animate='visible' transition={{ delay: 0.9, duration: 0.9 }}>
                    <li className={current === 2 ? "active" : null} onClick={() => setCurrent(2)}></li>
                </motion.a>
            </ol>

        </div>
    )
}

