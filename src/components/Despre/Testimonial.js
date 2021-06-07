import React, { useEffect } from 'react';
import './Testimonial.css';
import { useInView } from 'react-intersection-observer'
import { useAnimation, motion } from 'framer-motion'

export default function Testimonial({ data }) {

    const animation = useAnimation();
    const [contentRef, inView] = useInView({
        triggerOnce: true,
        rootMargin: "50px",
    })

    const testimonialAnim = {
        visible: {
            opacity: 1,
            y: 0,
            transition: { delay: 0.7, duration: 0.7, ease: [0.6, 0.05, -0.01, 0.9] },
        },
        hidden: { opacity: 0, y: 72 }
    }

    useEffect(() => {
        if (inView)
            animation.start('visible')

    }, [animation, inView])

    return (
        <div className="testimonials">
            <div className="inner">
                <motion.div className="row"
                    ref={contentRef} animate={animation} initial="hidden" variants={testimonialAnim}>
                    {data.map((item, index) => {
                        return (
                            <div className="col" key={index}>
                                <div className="testimonial col-shadow">
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
                </motion.div>
            </div>
        </div>
    )
}

