import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from "yup";
import AuthService from "../services/auth.service";
import './Login.css';

function Login({ show, close }) {

    let history = useHistory();

    const [toggler, setToggler] = useState(false);
    const [messageRegister, setMessageRegister] = useState("");
    const [messageLogin, setMessageLogin] = useState("");
    const [successfulLogin, setSuccessfulLogin] = useState(null);
    const [successfulRegister, setSuccessfulRegister] = useState(false);



    const SigninSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email!")
            .required("This field is required!"),
        password: Yup.string()
            .min(6, "Password is to short!")
            .max(50, "Password is to long!")
            .required("This field is required!")
    })

    const SignupSchema = Yup.object().shape({
        full_name: Yup.string()
            .min(4, "Name is to short!")
            .max(100, "Name is to long!")
            .required("Name is required!"),
        email: Yup.string()
            .email("Invalid email!")
            .required("Email is required!"),
        phone: Yup.string()
            .required("Phone is required!"),
        password: Yup.string()
            .min(6, "Password is to short!")
            .max(50, "Password is to long!")
            .required("Password is required!"),

        password2: Yup.string()
            .when("password", {
                is: val => (val && val.length > 0 ? true : false),
                then: Yup.string().oneOf(
                    [Yup.ref("password")],
                    "Password do not match!"
                )
            })
            .required("Password confirmation is required!")

    })

    function handleRegister(values) {

        const { full_name, email, phone, password } = values;

        AuthService.register(
            full_name,
            email,
            phone,
            password,
        ).then(
            response => {
                setMessageRegister(response.data.message);
                setSuccessfulRegister(true);
            },
            error => {
                const resMessage = (
                    error.response &&
                    error.response.data &&
                    error.response.data.message) || error.message || error.toString();
                setMessageRegister(resMessage);
                setSuccessfulRegister(false);
            }
        );
    }

    function handleLogin(values) {

        const { email, password } = values;

        AuthService.login(email, password).then(
            () => {

                const currentUser = AuthService.getCurrentUser();
                setSuccessfulLogin(currentUser);
                if (currentUser.role === "ROLE_USER") {
                    history.push("/user");
                    window.location.reload();

                } else if (currentUser.role === "ROLE_ADMIN") {
                    history.push("/admin");
                    window.location.reload();

                }
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMessageLogin(resMessage);
            }
        )
    }


    return (
        <div >

            { successfulLogin == null && (
                <div>
                    <div className="back-drop" style={{
                        transform: show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    }} onClick={close} />

                    <div className="login" style={{
                        display: toggler && 'none'
                    }}>
                        <div className="wrapperr">
                            <div className="cardd">
                                <div className="titlee">
                                    <h1 className="titlee title-large">Sign in</h1>
                                </div>
                                <div className="content">
                                    <Formik
                                        initialValues={
                                            {
                                                email: '',
                                                password: ''
                                            }
                                        }

                                        onSubmit={(values, { resetForm }) => {
                                            handleLogin(values);
                                            resetForm({ values: '' })
                                        }}

                                        validationSchema={SigninSchema}>

                                        {props => (


                                            <form onSubmit={props.handleSubmit} className="form">
                                                <div className="form-group">
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={props.values.email}
                                                        className="input-field"
                                                        placeholder="Email address"
                                                        onChange={props.handleChange}
                                                        onBlur={props.handleBlur}
                                                    />
                                                    {props.errors.email && props.touched.email && <p className="text-danger">{props.errors.email}</p>}
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        className="input-field"
                                                        placeholder="Password"
                                                        value={props.values.password}
                                                        onChange={props.handleChange}
                                                        onBlur={props.handleBlur}
                                                    />
                                                    {props.errors.password && props.touched.password && <p className="text-danger">{props.errors.password}</p>}
                                                </div>
                                                <div className="form-group">
                                                    <a href="#/" className="linktext f-pass">Forgot Password?</a>
                                                </div>
                                                <input
                                                    type="submit"
                                                    name="submit"
                                                    className="input-submit"
                                                    value="Login"
                                                    disabled={props.isSubmitting}

                                                />
                                            </form>
                                        )}
                                    </Formik>

                                    {messageLogin && <div className="alert alert-danger message" role="alert">
                                        {messageLogin}
                                    </div>
                                    }

                                    <div className="line">
                                        <span className="line-bar"></span>
                                        <span className="line-text">OR</span>
                                        <span className="line-bar"></span>
                                    </div>
                                    <div className="method">
                                        <div className="method-item">
                                            <a href="#/" className="btn-action">
                                                <i className="icons icons-facebook fab fa-facebook"></i>
                                                <span>Sign in with Facebook</span>
                                            </a>
                                        </div>
                                    </div>
                                    <p className="titlee title-subs">Don't have an account? <span><a href="/#" className="linktext" onClick={() => setToggler(true)}>Sign up</a></span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="register" style={{
                display: toggler === false && 'none'
            }
            }>
                <div className="wrapperr">
                    <div className="cardd">
                        <div className="titlee">
                            <h1 className="titlee title-large">Sign up</h1>
                        </div>
                        <div className="content">
                            <Formik

                                initialValues={
                                    {
                                        full_name: '',
                                        email: '',
                                        phone: '',
                                        password: '',
                                        password2: ''
                                    }
                                }
                                onSubmit={(values, { resetForm }) => {
                                    handleRegister(values);
                                    resetForm({ values: '' })
                                }}

                                validationSchema={SignupSchema}>
                                {props => (
                                    <form onSubmit={props.handleSubmit} className="form">
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                name="full_name"
                                                value={props.values.full_name}
                                                className="input-field"
                                                placeholder="Full name"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}

                                            />
                                            {props.errors.full_name && props.touched.full_name && <p className="text-danger">{props.errors.full_name}</p>}
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="email"
                                                name="email"
                                                className="input-field"
                                                placeholder="Email"
                                                value={props.values.email}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}

                                            />
                                            {props.errors.email && props.touched.email && <p className="text-danger">{props.errors.email}</p>}
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                name="phone"
                                                className="input-field"
                                                value={props.values.phone}
                                                placeholder="Phone"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}

                                            />
                                            {props.errors.phone && props.touched.phone && <p className="text-danger">{props.errors.phone}</p>}
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="password"
                                                name="password"
                                                className="input-field"
                                                value={props.values.password}
                                                placeholder="Password"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}

                                            />
                                            {props.errors.password && props.touched.password && <p className="text-danger">{props.errors.password}</p>}
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="password"
                                                name="password2"
                                                value={props.values.password2}
                                                className="input-field"
                                                placeholder="Password confirmation"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            />
                                            {props.errors.password2 && props.touched.password2 && <p className="text-danger">{props.errors.password2}</p>}
                                        </div>

                                        <input
                                            type="submit"
                                            name="submit"
                                            className="input-submit"
                                            value="Register"

                                        />

                                    </form>
                                )}
                            </Formik>

                            {(successfulRegister || messageRegister) && <div className={successfulRegister ? "alert alert-success message" : "alert alert-danger message"} role="alert">
                                {messageRegister}
                            </div>
                            }

                            <p className="titlee title-subs">Have an account? <span><a href="#/" className="linktext" onClick={() => setToggler(false)}>Sign in</a></span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
