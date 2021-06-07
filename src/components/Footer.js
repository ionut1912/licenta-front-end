import React, { useState, useEffect } from 'react'
import { Formik } from 'formik';
import * as Yup from "yup";
import ContactService from '../services/contact.service';
import Notification from './Notification'
import './Footer.css';

import { useInView } from 'react-intersection-observer'
import { useAnimation, motion } from 'framer-motion'

export default function Footer() {

    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

    const ContactSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email!")
            .required("This field is required!"),
        message: Yup.string()
            .required("This field is required!")
    })

    function handleSend(values) {

        const { email, message } = values;

        ContactService.sendContactEmail(
            email,
            message
        ).then(
            response => {
                setNotify({
                    isOpen: true,
                    message: response.data.message,
                    type: 'success'
                });
            },
            error => {
                const resMessage = (
                    error.response &&
                    error.response.data &&
                    error.response.data.message) || error.message || error.toString();
                setNotify({
                    isOpen: true,
                    message: resMessage,
                    type: 'error'
                });
            }
        );
    }


    //animation
    const animation = useAnimation();
    const [contentRef, inView] = useInView({
        triggerOnce: true,
        rootMargin: "0px",
    })

    const animation2 = useAnimation();
    const [contentRefBottom, inViewBottom] = useInView({
        triggerOnce: true,
        rootMargin: "30px",
    })

    const showFooterContent = {
        visible: {
            opacity: 1,
            y: 0,
            transition: { delay: 0.5, duration: 0.5, ease: [0.6, 0.05, -0.01, 0.9] },
        },
        hidden: { opacity: 0, y: 50 }
    }

    const showFooterBottom = {
        visible: {
            opacity: 1,
            transition: { delay: 0.4, duration: 0.4 },
        },
        hidden: { opacity: 0 }
    }

    useEffect(() => {
        if (inView)
            animation.start('visible')

        if (inViewBottom)
            animation2.start('visible')

    }, [animation,animation2, inView, inViewBottom])

    return (
        <>
            <div className="footer">
                <motion.div className="footer-content" ref={contentRef}
                    animate={animation}
                    initial="hidden"
                    variants={showFooterContent}>
                    <div className="footer-section about">
                        <h1 className="logo-text"><span>C</span>rystal System</h1>
                        <br />
                        <p>Here you can find some information about our events and some photos.</p>
                        <div className="contact">
                            <span><i className="fas fa-phone" /> &nbsp; 021-335-2123</span>
                            <span><i className="fas fa-envelope" /> &nbsp; info@crystal-system.eu</span>
                        </div>
                        <div className="socials">
                            <a href="https://www.facebook.com/crystalsystemro/" alt="fb"><i className="fab fa-facebook-square"></i></a>
                            <a href="https://www.instagram.com/crystalsystem/" alt="instagram"><i className="fab fa-instagram" /></a>
                            <a href="https://www.linkedin.com/company/crystal-system/" alt="linkedin"><i className="fab fa-linkedin" /></a>
                        </div>
                    </div>
                    <div className="footer-section links">
                        <h1>Quick Links</h1>
                        <br />
                        <ul>
                            <a href="/home"><li>Home</li></a>
                            <a href="/about"><li>About</li></a>
                            <a href="/jobs"><li>Jobs</li></a>
                            <a href="/makeCV"><li>Make CV</li></a>
                        </ul>
                    </div>
                    <div className="footer-section contact-form">
                        <h1>Contact</h1>
                        <br />
                        <Formik
                            initialValues={
                                {
                                    email: '',
                                    message: ''
                                }
                            }

                            onSubmit={(values, { resetForm }) => {
                                handleSend(values);
                                resetForm({ values: '' })
                            }}

                            validationSchema={ContactSchema}>
                            {props => (

                                <form onSubmit={props.handleSubmit}>
                                    <input
                                        type="email"
                                        name="email"
                                        value={props.values.email}
                                        className="contact-input"
                                        placeholder="Your email address"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                    />
                                    {props.errors.email && props.touched.email && <p className="text-danger">{props.errors.email}</p>}

                                    <textarea
                                        name="message"
                                        value={props.values.message}
                                        className="contact-input"
                                        placeholder="Your message"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                    />
                                    {props.errors.message && props.touched.message && <p className="text-danger">{props.errors.message}</p>}

                                    <input type="submit" name="submit" value="Send" className="btn btn-primary btn-lg" disabled={props.isSubmitting} />
                                </form>
                            )}
                        </Formik>
                    </div>
                </motion.div>

                <div className="footer-bottom">
                    <motion.span ref={contentRefBottom} animate={animation2} initial="hidden" variants={showFooterBottom}>
                        Copyright &copy; 2021. Desgined by <span>Matei Alexandru</span>
                    </motion.span>
                </div>
            </div>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </>
    )
}

