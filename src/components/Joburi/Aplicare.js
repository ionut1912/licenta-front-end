import React from 'react'
import { Formik } from 'formik';
import * as Yup from "yup";
import AplicareJobService from '../../services/aplicareJob.serivce'
import './Aplicare.css'

function Aplicare(props) {

    const validateSchema = Yup.object().shape({
        full_name: Yup.string()
            .required("This field is required!"),
        email: Yup.string()
            .email("Invalid email!")
            .required("This field is required!"),
        telefon: Yup.string()
            .required("This field is required!"),
        cv: Yup.string()
            .required("This field is required!")
    })

    function handleSubmit(values) {
        console.log(values);
        AplicareJobService.sendAplicare(1,58,values);
        props.showDetails(false);
        props.close(false);
    }

    return (
        <div className="form-aplicare">
            <Formik
                initialValues={
                    {
                        full_name: '',
                        email: '',
                        telefon: '',
                        cv: ''
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
                            <label htmlFor="inputcv">CV*</label>
                            <input type="text"
                                name="cv"
                                value={props.cv}
                                className="form-control"
                                id="inputcv"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                            />
                            {props.errors.cv && props.touched.cv && <p className="text-danger">{props.errors.cv}</p>}
                        </div>
                        {/* <div className="form-group">
                            <label htmlFor="inputCV">CV*</label>
                            <input type="file"
                                id="inputCV"
                                name="cv"
                                value={props.cv}
                                className="form-control"
                                accept=".pdf,.doc,.docx"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                            />
                            {props.errors.cv && props.touched.cv && <p className="text-danger">{props.errors.cv}</p>}
                        </div> */}

                        <button type="submit" name="submit" className="btn-submit" >Aplica</button>

                    </form>
                )}
            </Formik>

        </div>
    )
}

export default Aplicare
