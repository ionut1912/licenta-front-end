import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from "yup";
import { TextField, InputAdornment, makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AuthService from "../services/auth.service";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Notification from './Notification'
import './Login.css';

const useStyles = makeStyles(theme => ({
    icon: {
        '& .MuiIconButton-root': {
            outline: 'none'
        }
    },
    input: {
        '& .MuiOutlinedInput-root': {
            backgroundColor: '#f1f1f1'
        }
    }
}))

export default function Login({ setSubTitle }) {

    let history = useHistory();

    const classes = useStyles();

    const [toggler, setToggler] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

    const SigninSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email!")
            .max(60, "Email is to long!")
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
            .matches(/^[a-zA-Z ,.'-]+$/, "Name can't contains number")
            .required("Name is required!"),
        email: Yup.string()
            .email("Invalid email!")
            .max(60, "Email is to long!")
            .required("Email is required!"),
        phone: Yup.string()
            .matches(/^[0-9]{10}$/, 'Must be exactyle 10 digits')
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

    function handleLogin(values) {

        const { email, password } = values;

        AuthService.login(email, password).then(
            () => {

                const currentUser = AuthService.getCurrentUser();
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

                setNotify({
                    isOpen: true,
                    message: resMessage,
                    type: 'error'
                });
            }
        )
    }


    return (
        <div >
            {/*************************************************************************************Sign-in**************************************************************************************/}
            <div className="login" style={{
                display: toggler && 'none'
            }}>
                <div className="wrapperr">
                    <div className="cardd">

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
                                        <div className="form-group-input">
                                            <TextField
                                                variant="outlined"
                                                type="email"
                                                name="email"
                                                fullWidth
                                                className={classes.input}
                                                label="Email address"
                                                value={props.values.email}
                                                autoComplete="current-email"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            />

                                            {props.errors.email && props.touched.email && <p className="text-danger">{props.errors.email}</p>}
                                        </div>
                                        <div className="form-group-input">
                                            <TextField
                                                variant="outlined"
                                                type={showPassword === true ? "text" : "password"}
                                                name="password"
                                                label="Password"
                                                className={classes.input}
                                                fullWidth
                                                value={props.values.password}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                autoComplete="current-password"
                                                InputProps={{
                                                    endAdornment: (
                                                        < InputAdornment position="end" className={classes.icon}>
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={() => setShowPassword(!showPassword)}
                                                            >
                                                                {showPassword === true ? <Visibility /> : <VisibilityOff />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                            {props.errors.password && props.touched.password && <p className="text-danger">{props.errors.password}</p>}
                                        </div>
                                        <div className="form-group">
                                            <a href="#/" className="linktext f-pass">Forgot Password?</a>
                                        </div>
                                        <input
                                            type="submit"
                                            name="submit"
                                            className="btn btn-primary input-submit"
                                            value="Login"
                                            disabled={props.isSubmitting}

                                        />

                                        {/* <div className="line">
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
                                        </div> */}
                                        <p className="titlee title-subs">Don't have an account? <span className="linktext" onClick={() => { props.resetForm(); setToggler(true); setSubTitle('Sign up by entering the information below') }}>Sign up</span></p>
                                    </form>

                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>




            {/*************************************************************************************Register**************************************************************************************/}

            <div className="register" style={{
                display: toggler === false && 'none'
            }
            }>
                <div className="wrapperr">
                    <div className="cardd">
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
                                        <div className="form-group-input">
                                            <TextField
                                                variant="outlined"
                                                type="text"
                                                name="full_name"
                                                fullWidth
                                                className={classes.input}
                                                label="Full name"
                                                value={props.values.full_name}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            />
                                            {props.errors.full_name && props.touched.full_name && <p className="text-danger">{props.errors.full_name}</p>}
                                        </div>
                                        <div className="form-group-input">
                                            <TextField
                                                variant="outlined"
                                                type="email"
                                                name="email"
                                                fullWidth
                                                className={classes.input}
                                                label="Email address"
                                                autoComplete="new-email"
                                                value={props.values.email}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            />
                                            {props.errors.email && props.touched.email && <p className="text-danger">{props.errors.email}</p>}
                                        </div>

                                        <div className="form-group-input">
                                            <TextField
                                                variant="outlined"
                                                type="text"
                                                name="phone"
                                                fullWidth
                                                className={classes.input}
                                                label="Phone number"
                                                autoComplete="new-phone"
                                                value={props.values.phone}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            />
                                            {props.errors.phone && props.touched.phone && <p className="text-danger">{props.errors.phone}</p>}
                                        </div>
                                        <div className="form-group-input">
                                            <TextField
                                                variant="outlined"
                                                type={showPassword === true ? "text" : "password"}
                                                name="password"
                                                label="Password"
                                                className={classes.input}
                                                fullWidth
                                                value={props.values.password}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                autoComplete="new-password"
                                                InputProps={{
                                                    endAdornment: (
                                                        < InputAdornment position="end" className={classes.icon}>
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={() => setShowPassword(!showPassword)}
                                                            >
                                                                {showPassword === true ? <Visibility /> : <VisibilityOff />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                            {props.errors.password && props.touched.password && <p className="text-danger">{props.errors.password}</p>}
                                        </div>
                                        <div className="form-group-input">
                                            <TextField
                                                variant="outlined"
                                                type={showPassword2 === true ? "text" : "password"}
                                                name="password2"
                                                label="Password confirmation"
                                                className={classes.input}
                                                fullWidth
                                                value={props.values.password2}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                autoComplete="new-password"
                                                InputProps={{
                                                    endAdornment: (
                                                        < InputAdornment position="end" className={classes.icon}>
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={() => setShowPassword2(!showPassword2)}
                                                            >
                                                                {showPassword2 === true ? <Visibility /> : <VisibilityOff />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                            {props.errors.password2 && props.touched.password2 && <p className="text-danger">{props.errors.password2}</p>}
                                        </div>

                                        <input
                                            type="submit"
                                            name="submit"
                                            className="btn btn-primary input-submit"
                                            value="Register"

                                        />
                                        <p className="titlee title-subs">Have an account? <span className="linktext" onClick={() => { props.resetForm(); setToggler(false); setSubTitle('Sign in by entering the information below'); }}>Sign in</span></p>
                                    </form>
                                )}
                            </Formik>


                        </div>
                    </div>
                </div>
            </div>

            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </div>
    )
}
