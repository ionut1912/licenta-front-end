import React from 'react'
import { Formik } from 'formik';
import * as Yup from "yup";

function StaticInfoSection(props) {

    const validateSchema = Yup.object().shape({
        nume_job: Yup.string()
            .required("This field is required!"),
        locatie: Yup.string()
            .required("This field is required!"),
        descriere: Yup.string()
            .required("This field is required!"),
        dataMaxima: Yup.string()
            .required("This field is required!")
    })

    function handleSubmit(values) {
        props.setStaticInfo(values);
        props.setJobInfo(prevInfo => {
            return {
                ...prevInfo,
                numeJob: values.nume_job,
                locatie: values.locatie,
                descriere: values.descriere,
                dataMaxima:values.dataMaxima
            }
        })
        props.changeState(2);
    }
    return (
        <div className="form-cls">
            <Formik
                enableReinitialize={true}
                initialValues={props.staticInfo}

                onSubmit={(values) => {
                    handleSubmit(values);
                }}

                validationSchema={validateSchema}>

                {props => (
                    <form onSubmit={props.handleSubmit} >

                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label htmlFor="inputNJ">Nume job*</label>
                                <input type="text"
                                    name="nume_job"
                                    value={props.values.nume_job}
                                    className="form-control"
                                    id="inputNJ"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                />
                                {props.errors.nume_job && props.touched.nume_job && <p className="text-danger">{props.errors.nume_job}</p>}
                            </div>

                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputLocatie">Locatie*</label>
                                <input type="text"
                                    name="locatie"
                                    value={props.values.locatie}
                                    className="form-control"
                                    id="inputLocatie"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                />
                                {props.errors.locatie && props.touched.locatie && <p className="text-danger">{props.errors.locatie}</p>}
                            </div>

                            <div className="form-group col-md-6">
                                <label htmlFor="inputDate">Last date*</label>
                                <input type="date"
                                    name="dataMaxima"
                                    value={props.values.dataMaxima}
                                    data-date-format="dd-mm-yyyy"
                                    className="form-control"
                                    id="inputDate"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                />

                                {props.errors.dataMaxima && props.touched.dataMaxima && <p className="text-danger">{props.errors.dataMaxima}</p>}
                            </div>

                        </div>


                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label htmlFor="inputDescriere">Descriere</label>
                                <textarea
                                    name="descriere"
                                    value={props.values.descriere}
                                    className="form-control"
                                    id="inputDescriere"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur} />
                            </div>
                            {props.errors.descriere && props.touched.descriere && <p className="text-danger">{props.errors.descriere}</p>}
                        </div>

                        <div className="btn-next">
                            <button type="submit" name="submit" className="btn btn-primary" >Next  <i className="fa fa-arrow-right" aria-hidden="true"></i></button>
                        </div>
                    </form>
                )}
            </Formik>

        </div>
    )
}

export default StaticInfoSection
