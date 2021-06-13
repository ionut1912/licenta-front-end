import React from 'react';
import { Formik } from 'formik';
import * as Yup from "yup";
import AuthService from "../../services/auth.service";



export default function ConfirmCode({ state, setState, setNotify, setSubTitle, codeType, email }) {

    const codeSchema = Yup.object().shape({
        code1: Yup.string()
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
            error => setNotify({
                isOpen: true,
                message: "Network error!",
                type: 'error'
            })
        )
    }


    function handleVerify(values) {
        const code = "RgVFLYHC"
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
                error => setNotify({
                    isOpen: true,
                    message: "Network error!",
                    type: 'error'
                })
            )
        } else if (codeType === "activation") {

        }
    }

    return (
        /********************************* Verify code for change password/active cont ****************************************************************/
        <div className={codeType === "activation" ? "active-code" : "change-code"} style={{
            display: state !== 3 && 'none'
        }}>
            <div className="wrapperr">
                <div className="cardd">
                    <div className="content">
                        <Formik
                            initialValues={
                                {
                                    code1: '',
                                    code2: '',
                                    code3: '',
                                    code4: '',
                                    code5: '',
                                    code6: '',
                                    code7: '',
                                    code8: '',
                                }
                            }

                            onSubmit={(values, { resetForm }) => {
                                handleVerify();
                                resetForm({ values: '' })
                            }}

                            validationSchema={codeSchema}>

                            {props => (

                                <form onSubmit={props.handleSubmit} className="form">
                                    <div className="form-group-input">
                                        <input
                                            variant="outlined"
                                            type="text"
                                            name="code1"
                                            maxLength="1"
                                            label="Email address"
                                            value={props.values.code1}
                                            autoComplete="current-code"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        />

                                        <input
                                            variant="outlined"
                                            type="text"
                                            name="code2"
                                            maxLength="1"
                                            label="Email address"
                                            value={props.values.code2}
                                            autoComplete="current-code"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        />

                                        <input
                                            variant="outlined"
                                            type="text"
                                            name="code3"
                                            maxLength="1"
                                            label="Email address"
                                            value={props.values.code3}
                                            autoComplete="current-code"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        />

                                        <input
                                            variant="outlined"
                                            type="text"
                                            name="code4"
                                            maxLength="1"
                                            label="Email address"
                                            value={props.values.code4}
                                            autoComplete="current-code"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        />

                                        <input
                                            variant="outlined"
                                            type="text"
                                            name="code5"
                                            maxLength="1"
                                            label="Email address"
                                            value={props.values.code5}
                                            autoComplete="current-code"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        />

                                        <input
                                            variant="outlined"
                                            type="text"
                                            name="code6"
                                            maxLength="1"
                                            label="Email address"
                                            value={props.values.code6}
                                            autoComplete="current-code"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        />

                                        {codeType === "activation" ? null :
                                            <input
                                                variant="outlined"
                                                type="text"
                                                name="code7"
                                                maxLength="1"
                                                label="Email address"
                                                value={props.values.code7}
                                                autoComplete="current-code"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            />
                                        }

                                        {codeType === "activation" ? null :
                                            <input
                                                variant="outlined"
                                                type="text"
                                                name="code8"
                                                maxLength="1"
                                                label="Email address"
                                                value={props.values.code8}
                                                autoComplete="current-code"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            />
                                        }

                                        {props.errors.code1 && props.touched.code1 && <p className="text-danger">{props.errors.code1}</p>}
                                    </div>

                                    <input
                                        type="submit"
                                        name="submit"
                                        className="btn btn-primary input-submit"
                                        value="Verify"
                                    />

                                    <p className="linktext" style={{ margin: '10px 0 -10px 0' }} onClick={() => handleSendEmail()}>Send code again </p>
                                    <p className="titlee title-subs" style={{ marginTop: '0px' }}>Go to login? <span className="linktext" onClick={() => { props.resetForm(); setState(1); setSubTitle('Sign in by entering the information below') }}>Sign in</span></p>
                                </form>

                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}


