import React, { useState, useEffect } from 'react'
import DoneAllIcon from '@material-ui/icons/DoneAll';
import './Strenghts.css'
import { useInView } from 'react-intersection-observer'
import { useAnimation, motion } from 'framer-motion'

export default function Strenghts({ strenghts }) {

    const [current, setCurrent] = useState(0);

    const [repet, setRepet] = useState(false);

    const animation = useAnimation();
    const [contentRef, inViewFirstPart] = useInView({
        triggerOnce: true,
    })

    const animation2 = useAnimation();
    const [contentRef2, inViewSecondPart] = useInView({
        triggerOnce: true,
    })

    const titleAnim = {
        hidden: {
            x: -150, opacity: 0
        },
        visible: {
            x: 0, opacity: 1,
            transition: { delay: 0.6, duration: 0.6 }
        }
    }

    const cardAnim = {
        hidden: {
            x: 150, opacity: 0
        },
        visible: {
            x: 0, opacity: 1,
            transition: { duration: 1, delay: 1 }
        }
    }

    const descriptionAnim = {
        hidden: {
            x: -150, opacity: 0
        },
        visible: {
            x: 0, opacity: 1,
            transition: { duration: 0.5, delay: 0.5 }
        }
    }

    const imgAnim = {
        hidden: {
            x: 150, opacity: 0
        },
        visible: {
            x: 0, opacity: 1,
            transition: { duration: 0.6, delay: 0.6 }
        }
    }

    useEffect(() => {
        if (inViewFirstPart)
            animation.start('visible')

        if (inViewSecondPart) {
            animation2.start('visible')
            setRepet(true);
        }

    }, [animation, animation2, inViewFirstPart, inViewSecondPart])


    return (
        <div className="strenghts-section" ref={contentRef}>
            <motion.h1 variants={titleAnim} animate={animation} initial="hidden"
                className="section-title" style={{ color: '#fff', marginBottom: '20px' }} >Our strenghts</motion.h1>
            <div className="strengths container">

                <motion.div variants={cardAnim} animate={animation} initial="hidden" className="row">
                    {strenghts.map((strenght, index) => {
                        return (
                            <div key={index} className={index === current ? "strength-col-logo active" : "strength-col-logo "} onClick={() => { setCurrent(index) }}>
                                <img src={strenght.logo} alt="img" className="strength-logo" />
                                <p className="strength-title">{strenght.title}</p>
                            </div>
                        )
                    })}
                </motion.div>

                {strenghts.map((strenght, index) => {
                    return (
                        <div key={index}>
                            {index === current &&
                                <div className="strength-row-details" >

                                    <div className="strength-col-details">
                                        <div className="strength-description">
                                            <ul>
                                                {strenght.text.map((item, nr) => {
                                                    return (
                                                        <motion.li className='list-item' key={nr} ref={contentRef2}
                                                            variants={descriptionAnim} animate={repet === true ? 'visible' : animation2} initial="hidden" >
                                                            <span style={item[0] === '-' ? { marginRight: '50px' } : null}>
                                                                {item[0] === '-' ? null : <DoneAllIcon />}
                                                            </span>
                                                            {item}
                                                        </motion.li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="strength-col-details">
                                        <motion.img ref={contentRef2} variants={imgAnim} animate={repet === true ? 'visible' : animation2} initial="hidden"
                                            src={strenght.img} alt={"img " + index} className="strength-img" />
                                    </div>

                                </div>
                            }
                        </div>
                    )
                })}


            </div>
        </div>
    )
}
