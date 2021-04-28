import React, { useState } from 'react'
import { Formik } from 'formik';
import * as Yup from "yup";
import AplicareJobService from '../../services/aplicareJob.serivce'
import UserService from '../../services/auth.service';
import './Aplicare.css'

function Aplicare(props) {

    const [baseCV, setBaseCV] = useState("");

    const currentUser = UserService.getCurrentUser();

    const idJob = props.idJob;

    const validateSchema = Yup.object().shape({
        full_name: Yup.string()
            .required("This field is required!"),
        email: Yup.string()
            .email("Invalid email!")
            .required("This field is required!"),
        telefon: Yup.string()
            .required("This field is required!")
    })

    function handleSubmit(values) {

        if (baseCV !== "") {
            values.cv = baseCV;
        }

        if (currentUser !== null) {
            AplicareJobService.sendAplicareUser(currentUser.id, idJob, values).then(
                () => {
                    props.setMessage("Ai aplicat cu succes!")
                    props.state(true)
                },
                error => {
                    props.setMessage("CV ul introdus este eronat,incearca altul!")
                    props.state(false)
                }


            )

        } else {
            AplicareJobService.sendAplicareNoUser(idJob, values).then(
                () => {
                    props.setMessage("Ai aplicat cu succes!")
                    props.state(true)
                },
                error => {
                    props.setMessage("CV ul introdus este eronat,incearca altul!")
                    props.state(false)
                }
            )
        }


    }


    const uploadCV = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setBaseCV(base64);

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
                    {
                        full_name: '',
                        email: '',
                        telefon: '',
                        
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
                                value={props.full_name}
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
                                value={props.email}
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
                                value={props.telefon}
                                className="form-control"
                                id="inputPhone"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                            />
                            {props.errors.telefon && props.touched.telefon && <p className="text-danger">{props.errors.telefon}</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="inputCV">CV*</label>
                            <input type="file"
                                id="inputCV"
                                accept=".pdf,.doc,.docx"
                                className="form-control"
                                onChange={uploadCV}
                                required
                            />
                        </div>

                        <button type="submit" name="submit" className="btn-submit" >Aplica</button>

                    </form>
                )}
            </Formik>

        </div>
    )
}

export default Aplicare
