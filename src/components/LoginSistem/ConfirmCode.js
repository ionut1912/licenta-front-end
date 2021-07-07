import React from 'react';
import { Formik } from 'formik';
import * as Yup from "yup";
import AuthService from "../../services/auth.service";
import { TextField, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';


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


export default function ConfirmCode({ state, setState, setNotify, setSubTitle, codeType, email, password }) {

    let history = useHistory();

    const classes = useStyles();

    const codeSchema = Yup.object().shape({
        code: Yup.string()
            .required("This field is required!"),
    })

    function handleSendEmail() {

        AuthService.generateVerifyCode(email, codeType).then(
            response => {
                setNotify({
                    isOpen: true,
                    message: "Code sent with success!",
                    type: 'success'
                })
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


    function handleVerify(values) {
        const code = values.code;
        if (codeType === "password") {
            AuthService.checkVerifyCodee(codeType, email, code).then(
                response => {
                    if (response.data === true) {
                        setSubTitle('Change password by entering the information below')
                        setNotify({
                            isOpen: true,
                            message: "Code is correct!",
                            type: 'success'
                        })
                        setState(5);
                    } else
                        setNotify({
                            isOpen: true,
                            message: "Code is incorrect!",
                            type: 'error'
                        })

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
        } else if (codeType === "activation") {
            AuthService.checkVerifyCodee(codeType, email, code).then(
                response => {
                    if (response.data === true) {
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
                    } else
                        setNotify({
                            isOpen: true,
                            message: "Code is incorrect!",
                            type: 'error'
                        })
                }
            )
        }
    }

    return (
        /********************************* Verify code for change password/active cont ****************************************************************/
        <div className="confirmCode" style={{
            display: state !== 3 && 'none'
        }}>
            <div className="wrapperr">
                <div className="cardd">
                    <div className="content">
                        <Formik
                            initialValues={
                                {
                                    code: '',
                                }
                            }

                            onSubmit={(values, { resetForm }) => {
                                handleVerify(values);
                                resetForm({ values: '' })
                            }}

                            validationSchema={codeSchema}>

                            {props => (

                                <form onSubmit={props.handleSubmit} className="form">
                                    <div className="form-group-input">
                                        <TextField
                                            variant="outlined"
                                            type="text"
                                            name="code"
                                            fullWidth
                                            className={classes.input}
                                            label="Verification code"
                                            value={props.values.code}
                                            autoComplete="current-email"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        />

                                        {props.errors.code && props.touched.code && <p className="text-danger">{props.errors.code}</p>}
                                    </div>

                                    <input
                                        type="submit"
                                        name="submit"
                                        className="btn btn-primary input-submit"
                                        value="Verify"
                                    />

                                    <p className="linktext" style={{ margin: '10px 0 -10px 0', textAlign: 'center' }} onClick={() => handleSendEmail()}>Send code again </p>
                                    <p className="titlee title-subs" style={{ marginTop: '0px' }}>Go to login? <span className="linktext"
                                        onClick={() => {
                                            props.resetForm();
                                            setState(1);
                                            setSubTitle('Sign in by entering the information below');
                                            codeType === "password" && AuthService.setCodeToNull(email)
                                        }}
                                    >Sign in</span></p>
                                </form>

                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}


