import React, { useEffect, useState } from 'react'
import ViewPopup from '../ViewPopup'
import ViewService from './ViewServices'
import './ServicesTestimonial.css'
import { useInView } from 'react-intersection-observer'
import { useAnimation, motion } from 'framer-motion'

export default function ServicesTestimonial({ data }) {

    const [openPopupView, setOpenPopupView] = useState(false);
    const [currentItem, setCurrentItem] = useState("");

    const animation = useAnimation();
    const [contentRef, inView] = useInView({
        triggerOnce: true,
    })

    const animation2 = useAnimation();
    const [contentRefTitle, inViewTitle] = useInView({
        triggerOnce: true,
    })
    const showService = {
        visible: {
            opacity: 1,
            y: 0,
            transition: { delay: 0.6, duration: 0.6, ease: [0.6, 0.05, -0.01, 0.9] },
        },
        hidden: { opacity: 0, y: 72 }
    }

    const showTitle = {
        visible: {
            opacity: 1,
            transition: { delay: 0.5, duration: 0.5, ease: [0.6, 0.05, -0.01, 0.9] },
        },
        hidden: { opacity: 0 },
    }

    useEffect(() => {
        if (inView)
            animation.start('visible')

        if (inViewTitle)
            animation2.start('visible')

    }, [animation, animation2,inView, inViewTitle])

    return (
        <div className="services">
            <motion.h1 className="section-title" ref={contentRefTitle} animate={animation2} initial="hidden" variants={showTitle} >Our Service</motion.h1>
            <div className="inner">
                <motion.div className="row" ref={contentRef}
                  animate={animation} initial="hidden" variants={showService}>
                    {data.map((item, index) => {
                        return (
                            <div className="col" key={index}>
                                <div className="box">
                                    <img src={item.img} alt={"img " + index} onClick={() => { setOpenPopupView(true); setCurrentItem(item); }} />
                                    <div className="name" >{item.name}</div>
                                    <p>{item.litleDescription}</p>
                                </div>
                            </div>
                        )
                    })}
                </motion.div>
            </div>
            <ViewPopup
                title={currentItem.name}
                openPopup={openPopupView}
                setOpenPopup={setOpenPopupView}>
                <ViewService recordForView={currentItem} />
            </ViewPopup>
        </div>
    )
}

