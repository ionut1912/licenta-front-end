import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from "yup";
import { TextField, InputAdornment, makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AuthService from "../../services/auth.service";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Notification from '../Notification'
import './Login.css';

import Register from './Register'
import ConfirmCode from './ConfirmCode'
import ChangePassword from './ChangePassword'

const useStyles = makeStyles(theme => ({
    icon: {
        '& .MuiIconButton-root': {
            outline: 'none'
        }
    },
    input: {
        '& .MuiOutlinedInput-root': {
            backgroundColor: '#f1f1f1'
        },
        '& .MuiSvgIcon-root': {
            [theme.breakpoints.down(350)]: {
                width: '1.1rem',
                height: '1.1rem'
            }
        }
    }
}))

export default function Login({ setSubTitle }) {

    let history = useHistory();

    const classes = useStyles();

    const [state, setState] = useState(1);

    const [codeType, setCodeType] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

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


    function handleLogin(values) {

        const { email, password } = values;

        AuthService.getVerificationCode(email, password).then(
            response => {
                if (response.data.message === null) {
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
                } else if (response.data === "Email or password are wrong") {
                    setNotify({
                        isOpen: true,
                        message: "Email or password are wrong",
                        type: 'error'
                    })
                }
                else {
                    setCodeType("activation");
                    setEmail(email);
                    setPassword(password);
                    setState(3);
                    setSubTitle('Enter the verification code we sent to your email for activation')
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
                display: state !== 1 && 'none'
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
                                            <span href="" className="linktext f-pass" onClick={() => { props.resetForm(); setState(4); setEmail(""); setSubTitle('Send code for change password by entering your email') }}>
                                                Forgot Password?
                                            </span>
                                        </div>
                                        <input
                                            type="submit"
                                            name="submit"
                                            className="btn btn-primary input-submit"
                                            value="Login"
                                        />

                                        <p className="titlee title-subs">Don't have an account? <span className="linktext" onClick={() => { props.resetForm(); setState(2); setSubTitle('Sign up by entering the information below') }}>Sign up</span></p>
                                    </form>

                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>




            {/*************************************************************************************Register**************************************************************************************/}

            <Register setState={setState} state={state} setNotify={setNotify} setSubTitle={setSubTitle} />

            <ConfirmCode setState={setState} state={state} setNotify={setNotify} setSubTitle={setSubTitle} codeType={codeType} email={email} password={password} />

            <ChangePassword setState={setState} state={state} setNotify={setNotify} setSubTitle={setSubTitle} setCodeType={setCodeType} setEmail={setEmail} email={email} />

            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </div>
    )
}
