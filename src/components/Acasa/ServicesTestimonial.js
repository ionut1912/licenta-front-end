import React, { useEffect, useState } from 'react'
import ViewPopup from '../ViewPopup'
import ViewService from './ViewServices'
import './ServicesTestimonial.css'
import { useInView } from 'react-intersection-observer'
import { useAnimation, motion } from 'framer-motion'

export default function ServicesTestimonial({ data }) {

    const animation = useAnimation();
    const [contentRef, inView] = useInView({
        triggerOnce: true,
        rootMargin: "300px",

    })


    const [openPopupView, setOpenPopupView] = useState(false);
    const [currentItem, setCurrentItem] = useState("");

    useEffect(() => {
        if (inView)
            animation.start('visible')

    }, [animation, inView])

    return (
        <div className="services">
            <h1 className="section-title">Our Service</h1>
            <div className="inner">
                <div className="row">
                    {data.map((item, index) => {
                        return (
                            <div className="col" key={index} ref={contentRef}>
                                <motion.div className="box"
                                    animate={animation}
                                    initial="hidden"
                                    variants={{
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: { delay: 0.3, duration: 0.3, ease: [0.6, 0.05, -0.01, 0.9] },
                                        },
                                        hidden: { opacity: 0, y: 72 },
                                    }}>
                                    <img src={item.img} alt={"img " + index} onClick={() => { setOpenPopupView(true); setCurrentItem(item); }} />
                                    <div className="name" >{item.name}</div>
                                    <p>{item.litleDescription}</p>
                                </motion.div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <ViewPopup
                title={currentItem.name}
                openPopup={openPopupView}
                setOpenPopup={setOpenPopupView}>
                <ViewService recordForView={currentItem} buttonsAddJob={false} />
            </ViewPopup>
        </div>
    )
}

