import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from "yup";
import { makeStyles, TextField, InputAdornment } from '@material-ui/core';
import AuthService from "../../services/auth.service";

import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

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

export default function ChangePassword({ state, setState, setNotify, setSubTitle, setCodeType, setEmail, email }) {

    const classes = useStyles();

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);


    const EmailSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email!")
            .max(60, "Email is to long!")
            .required("This field is required!"),
    })


    const passwordSchema = Yup.object().shape({
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


    function handleSendEmail(values) {
        const { email } = values;

        AuthService.generateVerifyCode(email, "password").then(
            response => {
                setSubTitle('Enter the verification code we sent to your email')
                setEmail(email);
                setCodeType("password");
                setNotify({
                    isOpen: true,
                    message: "Code sent with success!",
                    type: 'success'
                })
                setState(3)
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
                })
            }
        )
    }

    function handleChangePassword(values) {

        AuthService.changePassword(email, values.password).then(
            response => {
                setSubTitle('Sign in by entering the information below')
                setNotify({
                    isOpen: true,
                    message: 'Password changed with success!',
                    type: 'success'
                })
                setState(1)
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
                })
            }
        )
    }


    return (
        <div>

            {/* ******************************** Send email with code for change password ****************************************************************/}
            <div className="change" style={{
                display: state !== 4 && 'none'
            }}>
                <div className="wrapperr">
                    <div className="cardd">

                        <div className="content">
                            <Formik
                                initialValues={
                                    {
                                        email: ''
                                    }
                                }

                                onSubmit={(values, { resetForm }) => {
                                    handleSendEmail(values);
                                    resetForm({ values: '' })
                                }}

                                validationSchema={EmailSchema}>

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
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            />

                                            {props.errors.email && props.touched.email && <p className="text-danger">{props.errors.email}</p>}
                                        </div>

                                        <input
                                            type="submit"
                                            name="submit"
                                            className="btn btn-primary input-submit"
                                            value="Send"
                                        />

                                        <p className="titlee title-subs" style={{ marginTop: '0px' }}>Go to login? <span className="linktext" onClick={() => { props.resetForm(); setState(1); setSubTitle('Sign in by entering the information below') }}>Sign in</span></p>
                                    </form>

                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>


            {/* ********************************Change password****************************************************************/}
            <div className="change" style={{
                display: state !== 5 && 'none'
            }}>
                <div className="wrapperr">
                    <div className="cardd">

                        <div className="content">
                            <Formik
                                initialValues={
                                    {
                                        password: '',
                                        password2: ''
                                    }
                                }

                                onSubmit={(values, { resetForm }) => {
                                    handleChangePassword(values);
                                    resetForm({ values: '' })
                                }}

                                validationSchema={passwordSchema}>

                                {props => (

                                    <form onSubmit={props.handleSubmit} className="form">
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
                                                autoComplete="new-password2"
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
                                                autoComplete="new-password2"
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
                                            value="Send"
                                        />

                                        <p className="titlee title-subs" style={{ marginTop: '0px' }}>Go to login? <span className="linktext"
                                            onClick={() => {
                                                props.resetForm();
                                                setState(1);
                                                setSubTitle('Sign in by entering the information below')
                                                AuthService.setCodeToNull(email);
                                            }}>Sign in</span></p>
                                    </form>

                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )

}


