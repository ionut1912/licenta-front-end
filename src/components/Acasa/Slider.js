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

    const variant = {
        hidden: {
            x: 150,
            opacity: 0
        },
        visible: {
            x: 0,
            opacity: 1,
            transition: { type: 'spring', delay: 0.2, when: "afterChildren" }
        }
    }

    const variant2 = {
        visible: {
            x: [0, -10, 10, 0],
            transition: { type: 'spring', delay: 0.2 }
        }
    }

    return (
        <div className="carousel">
            <IoIosArrowBack className='left-arrow' onClick={prevSlide} />
            <IoIosArrowForward className='right-arrow' onClick={nextSlide} />
            <div className="carousel-inner container">
                {slides.map((slide, index) => {
                    return (
                        <div className="carousel-item active" key={index}>
                            {index === current &&
                                <div className="carousel-row" >

                                    <div className="carousel-col">
                                        <div className="infoDinamic-text-wrapper">
                                            <motion.div
                                                variants={variant2}
                                                animate="visible"
                                                className="static-text">CRYSTAL SYSTEM GROUP</motion.div>
                                            <motion.h1
                                                initial={{ y: -150, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.2 }}
                                            >{slide.h1}</motion.h1>
                                            {slide.p.map((item, current) => {
                                                return (
                                                    <p key={current} >{item}</p>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="carousel-col">
                                        <motion.img
                                            variants={variant}
                                            initial="hidden"
                                            animate="visible"
                                            src={slide.image} alt={"img " + index} className="img" />
                                    </div>

                                </div>
                            }
                        </div>
                    )
                })}
            </div>

            <ol className="carousel-indicators">
                <li className={current === 0 ? "active" : null} onClick={() => setCurrent(0)}></li>
                <li className={current === 1 ? "active" : null} onClick={() => setCurrent(1)}></li>
                <li className={current === 2 ? "active" : null} onClick={() => setCurrent(2)}></li>
            </ol>

        </div>
    )
}

