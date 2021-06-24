import React, { useState, useRef } from 'react';
import { Formik } from 'formik';
import * as Yup from "yup";
import { TextField, InputAdornment, makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AuthService from "../../services/auth.service";
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


export default function Register({ state, setState, setNotify, setSubTitle }) {

    const formRef = useRef();

    const classes = useStyles();

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const SignupSchema = Yup.object().shape({
        full_name: Yup.string()
            .min(4, "Name is to short!")
            .max(100, "Name is to long!")
            .matches(/^[a-zA-Z ,.'-]+$/, "Name can't contains number or symbols")
            .required("Name is required!"),
        email: Yup.string()
            .email("Invalid email!")
            .max(60, "Email is to long!")
            .required("Email is required!"),
        phone: Yup.string()
            .matches(/^(\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|\.|-)?([0-9]{3}(\s|\.|-|)){2}$/, 'Invalid phone number')
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
                
                AuthService.generateVerifyCode(email, "activation");
                formRef.current?.resetForm()
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
        <div className="register" style={{
            display: state !== 2 && 'none'
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
                            onSubmit={(values) => {
                                handleRegister(values);
                            }}

                            innerRef={formRef}

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
                                    <p className="titlee title-subs">Have an account? <span className="linktext" onClick={() => { props.resetForm(); setState(1); setSubTitle('Sign in by entering the information below'); }}>Sign in</span></p>
                                </form>
                            )}
                        </Formik>


                    </div>
                </div>
            </div>
        </div>
    )
}


