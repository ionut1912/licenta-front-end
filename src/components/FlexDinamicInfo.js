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


    // animation
    const imgAnim = {
        hidden: {
            x: imgStart === false ? 120 : -120,
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
            y: imgStart === false ? -150 : 150, opacity: 0
        },
        visible: {
            y: 0, opacity: 1,
            transition: { delay: 0.6, duration: 0.6 }
        }
    }

    const descriptionAnim = {
        hidden: {
            x: imgStart === false ? -150 : 150, opacity: 0
        },
        visible: {
            x: 0, opacity: 1,
            transition: { duration: 1, delay: 1 }
        }
    }

    const buttonAnim = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: { duration: 1.5, delay: 1.5 }
        }
    }

    return (
        <div className={lightBg ? 'infoDinamic-section' : 'infoDinamic-section darkBg'}>
            <div className="container"
                ref={contentRef}>
                <div className="row__item" style={{ flexDirection: imgStart === true ? 'row-reverse' : 'row' }}>

                    <div className="col__item">
                        <div className="infoDinamic-text-wrapper">
                            <motion.div variants={redTextAnim} animate={animation} initial="hidden"
                                className="top-line">{topLine}</motion.div>
                            <motion.h1 variants={titleAnim} animate={animation} initial="hidden"
                                className={lightText ? 'heading whiteColor' : 'heading'}>{headline}</motion.h1>
                            <motion.p variants={descriptionAnim} animate={animation} initial="hidden"
                                className={lightText ? 'infoDinamic-subtitle whiteColor' : 'infoDinamic-subtitle'}
                                style={description2 != null && description3 != null ? { marginBottom: '15px' } : null}>
                                {description}
                            </motion.p>
                            {description2 != null && description3 != null ? (
                                <motion.div variants={descriptionAnim} animate={animation} initial="hidden">
                                    <p className={lightText ? 'infoDinamic-subtitle whiteColor' : 'infoDinamic-subtitle'} style={{ marginBottom: "15px" }}>{description2}</p>
                                    <p className={lightText ? 'infoDinamic-subtitle whiteColor' : 'infoDinamic-subtitle'}>{description3}</p>
                                </motion.div>
                            ) : null}
                            <motion.a variants={buttonAnim} animate={animation} initial="hidden" href={goTo}>
                                <button className={buttonColor === "blue" ? "btn btn-primary btn-lg" : "btn btn-danger btn-lg"}>{buttonLabel}</button>
                            </motion.a>
                        </div>
                    </div>

                    <div className="col__item" >
                        <div className="infoDinamic-img-wrapper">
                            <motion.img variants={imgAnim} animate={animation} initial="hidden" src={img} alt={alt} className="infoDinamic-img" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

