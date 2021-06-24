import React, { useState } from 'react'
import { Formik } from 'formik';
import * as Yup from "yup";
import AplicareJobService from '../../services/aplicareJob.serivce'
import UserService from '../../services/auth.service';
import './Aplicare.css'

export default function Aplicare(props) {

    const [baseCV, setBaseCV] = useState("");
    const [fileChoosen, setFileChosen] = useState('No file choosen');
    const currentUser = UserService.getCurrentUser();

    const idJob = props.idJob;

    const validateSchema = Yup.object().shape({
        full_name: Yup.string()
            .max(100, "First name is to long!")
            .matches(/^[a-zA-Z ,.'-]+$/, "Full name can't contains number or symbols")
            .required("This field is required!"),
        email: Yup.string()
            .email("Invalid email!")
            .max(60, "Email is to long!")
            .required("This field is required!"),
        telefon: Yup.string()
            .matches(/^(\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|\.|-)?([0-9]{3}(\s|\.|-|)){2}$/, 'Invalid phone number')
            .required("This field is required!")
    })

    function handleSubmit(values) {

        if (baseCV !== "") {
            values.cv = baseCV;
        }

        if (currentUser !== null) {

            AplicareJobService.sendAplicareUser(currentUser.id, idJob, values).then(
                () => {
                    props.setNotify({
                        isOpen: true,
                        message: 'Ai aplicat cu succes!',
                        type: 'success'
                    });
                    props.state(false)
                },
                error => {
                    props.setNotify({
                        isOpen: true,
                        message: error.message,
                        type: 'error'
                    });
                }
            )

        } else {
            AplicareJobService.sendAplicareNoUser(idJob, values).then(
                () => {
                    props.setNotify({
                        isOpen: true,
                        message: 'Ai aplicat cu succes!',
                        type: 'success'
                    });
                    props.state(false)
                },
                error => {
                    props.setNotify({
                        isOpen: true,
                        message: 'Network error!',
                        type: 'error'
                    });
                }
            )
        }


    }


    const uploadCV = async (e) => {
        const file = e.target.files[0];
        if (file.name !== null) {
            setFileChosen(file.name);
            const base64 = await convertBase64(file);
            setBaseCV(base64);
        }
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    return (
        <div className="form-aplicare">
            <Formik
                initialValues={
                    currentUser === null ?
                        {
                            full_name: '',
                            email: '',
                            telefon: ''
                        }
                        :
                        {
                            full_name: currentUser.full_name,
                            email: currentUser.email,
                            telefon: currentUser.phone
                        }
                }

                onSubmit={(values) => {
                    handleSubmit(values);
                }}

                validationSchema={validateSchema}>

                {props => (
                    <form onSubmit={props.handleSubmit}>

                        <div className="form-group">
                            <label htmlFor="inputfn">Full name*</label>
                            <input type="text"
                                name="full_name"
                                value={props.values.full_name}
                                className="form-control"
                                id="inputfn"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                            />
                            {props.errors.full_name && props.touched.full_name && <p className="text-danger">{props.errors.full_name}</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="inputEmail">Email*</label>
                            <input type="email"
                                name="email"
                                value={props.values.email}
                                className="form-control"
                                id="inputEmail"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                            />
                            {props.errors.email && props.touched.email && <p className="text-danger">{props.errors.email}</p>}
                        </div>


                        <div className="form-group">
                            <label htmlFor="inputPhone">Telefon*</label>
                            <input type="text"
                                name="telefon"
                                value={props.values.telefon}
                                className="form-control"
                                id="inputPhone"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                            />
                            {props.errors.telefon && props.touched.telefon && <p className="text-danger">{props.errors.telefon}</p>}
                        </div>

                        <div className="form-group">
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div>
                                    <input type="file"
                                        accept=".pdf,.doc,.docx"
                                        className="input-file"
                                        onChange={uploadCV}
                                        required
                                    />
                                    <p className="file-name text-secondary" style={{ marginLeft: '0px' }}>{fileChoosen}</p>
                                </div>
                                <button type="submit" name="submit" className="btn btn-submit">Apply</button>
                            </div>
                        </div>

                    </form>
                )}
            </Formik>

        </div>
    )
}
