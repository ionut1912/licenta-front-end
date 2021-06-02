import React, { useEffect } from 'react'
import './FlexDinamicInfo.css'
import { useInView } from 'react-intersection-observer'
import { useAnimation, motion } from 'framer-motion'

export default function FlexDinamicInfo({
    lightBg, topLine, lightText, imgStart, headline,
    description, description2, description3, buttonLabel, buttonColor, goTo, img, alt
}) {


    const animation = useAnimation();
    const [contentRef, inView] = useInView({
        triggerOnce: true,
        rootMargin: "-50px",


    })

    useEffect(() => {
        if (inView)
            animation.start('visible')

    }, [animation, inView])

    return (
        <div className={lightBg ? 'infoDinamic-section' : 'infoDinamic-section darkBg'}>
            <div className="container"
                ref={contentRef}>
                <div className="row__item" style={{ flexDirection: imgStart === true ? 'row-reverse' : 'row' }}>

                    <div className="col__item">
                        <motion.div className="infoDinamic-text-wrapper"
                            animate={animation}
                            initial="hidden"
                            variants={{
                                visible: {
                                    opacity: 1,
                                    x: 0,
                                    transition: { type: 'spring', delay: 0.5, },
                                },
                                hidden: { opacity: 0, x: -50 },
                            }}>
                            <div className="top-line">{topLine}</div>
                            <h1 className={lightText ? 'heading whiteColor' : 'heading'}>{headline}</h1>
                            <p className={lightText ? 'infoDinamic-subtitle whiteColor' : 'infoDinamic-subtitle'}
                                style={description2 != null && description3 != null ? { marginBottom: '15px' } : null}>
                                {description}
                            </p>
                            {description2 != null && description3 != null ? (
                                <div>
                                    <p className={lightText ? 'infoDinamic-subtitle whiteColor' : 'infoDinamic-subtitle'} style={{ marginBottom: "15px" }}>{description2}</p>
                                    <p className={lightText ? 'infoDinamic-subtitle whiteColor' : 'infoDinamic-subtitle'}>{description3}</p>
                                </div>
                            ) : null}
                            <a href={goTo}>
                                <button className={buttonColor === "blue" ? "btn btn-primary btn-lg" : "btn btn-danger btn-lg"}>{buttonLabel}</button>
                            </a>
                        </motion.div>
                    </div>

                    <div className="col__item" >
                        <div className="infoDinamic-img-wrapper">
                            <motion.img
                                animate={animation}
                                initial="hidden"
                                variants={{
                                    visible: {
                                        opacity: 1,
                                        x: 0,
                                        transition: { type: 'spring', delay: 0.5, },
                                    },
                                    hidden: { opacity: 0, x: 50 },
                                }}
                                src={img} alt={alt} className="infoDinamic-img" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

