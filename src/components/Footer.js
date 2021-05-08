import React, { useState } from 'react'
import { Formik } from 'formik';
import * as Yup from "yup";
import ContactService from '../services/contact.service';
import Notification from './Notification'
import './Footer.css';

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

    return (
        <>
            <div className="footer">
                <div className="footer-content">
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
                        <h2>Quick Links</h2>
                        <br />
                        <ul>
                            <a href="/home"><li>Home</li></a>
                            <a href="/about"><li>About</li></a>
                            <a href="/jobs"><li>Jobs</li></a>
                            <a href="/makeCV"><li>Make CV</li></a>
                        </ul>
                    </div>
                    <div className="footer-section contact-form">
                        <h2>Contact</h2>
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
                </div>

                <div className="footer-bottom">
                    Copyright &copy; 2021. Desgined by <span>Matei Alexandru</span>
                </div>
            </div>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </>
    )
}

