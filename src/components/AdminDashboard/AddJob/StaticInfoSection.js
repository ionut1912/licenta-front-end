import React from 'react'
import { locations, types, categories } from '../../Joburi/JobEnums';
import { Formik } from 'formik';
import * as Yup from "yup";

export default function StaticInfoSection(props) {

    const validateSchema = Yup.object().shape({
        numeJob: Yup.string()
            .max(100, "Nume job is to long!")
            .required("This field is required!"),
        jobType: Yup.string()
            .required("This field is required!"),
        locatie: Yup.string()
            .required("This field is required!"),
        jobCategory: Yup.string()
            .required("This field is required!"),
        descriere: Yup.string()
            .max(1000, "Description is to long!")
            .required("This field is required!"),
        dataMaxima: Yup.date()
            .required("This field is required!")
            .min(new Date(), "Last date must be higher than current date")
    })

    function handleSubmit(values) {
        props.setJobInfo(prevInfo => {
            return {
                ...prevInfo,
                numeJob: values.numeJob,
                jobType: values.jobType,
                locatie: values.locatie,
                jobCategory: values.jobCategory,
                descriere: values.descriere,
                dataMaxima: values.dataMaxima
            }
        })
        props.changeState(2);
    }
    return (
        <div className="form-cls">
            <Formik
                enableReinitialize={true}
                initialValues={{
                    numeJob: props.jobInfo.numeJob,
                    jobType: props.jobInfo.jobType,
                    locatie: props.jobInfo.locatie,
                    jobCategory: props.jobInfo.jobCategory,
                    descriere: props.jobInfo.descriere,
                    dataMaxima: props.jobInfo.dataMaxima
                }}

                onSubmit={(values) => {
                    handleSubmit(values);
                }}

                validationSchema={validateSchema}>

                {props => (
                    <form onSubmit={props.handleSubmit} >

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputNJ">Nume job*</label>
                                <input type="text"
                                    name="numeJob"
                                    value={props.values.numeJob}
                                    className={props.errors.numeJob && props.touched.numeJob ? "form-control is-invalid" : "form-control"}
                                    id="inputNJ"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                />
                                {props.errors.numeJob && props.touched.numeJob && <p className="text-danger">{props.errors.numeJob}</p>}
                            </div>

                            <div className="form-group col-md-6">
                                <label htmlFor="inputNJ">Job type*</label>
                                <select
                                    name="jobType"
                                    value={props.values.jobType}
                                    className={props.errors.jobType && props.touched.jobType ? "form-control is-invalid" : "form-control"}
                                    id="inputNJ"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}>
                                    <option value="">Choose</option>
                                    {types.map((item, index) => {
                                        return (
                                            <option key={index} value={item}>{item === "FULL_TIME" ? "full-time" : "part-time"}</option>
                                        )
                                    })}
                                </select>

                                {props.errors.jobType && props.touched.jobType && <p className="text-danger">{props.errors.jobType}</p>}
                            </div>

                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label htmlFor="inputLocatie">Locatie*</label>
                                <select
                                    name="locatie"
                                    value={props.values.locatie}
                                    className={props.errors.locatie && props.touched.locatie ? "form-control is-invalid" : "form-control"}
                                    id="inputLocatie"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}>
                                    <option value="">Choose</option>
                                    {locations.map((item, index) => {
                                        return (
                                            <option key={index} value={item}>{item}</option>
                                        )
                                    })}
                                </select>
                                {props.errors.locatie && props.touched.locatie && <p className="text-danger">{props.errors.locatie}</p>}
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="inputCategory">Job category*</label>
                                <select
                                    name="jobCategory"
                                    value={props.values.jobCategory}
                                    className={props.errors.jobCategory && props.touched.jobCategory ? "form-control is-invalid" : "form-control"}
                                    id="inputCategory"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}>
                                    <option value="">Choose</option>
                                    {categories.map((item, index) => {
                                        return (
                                            <option key={index} value={item}>{item}</option>
                                        )
                                    })}
                                </select>
                                {props.errors.jobCategory && props.touched.jobCategory && <p className="text-danger">{props.errors.jobCategory}</p>}
                            </div>

                            <div className="form-group col-md-4">
                                <label htmlFor="inputDate">Last date*</label>
                                <input type="date"
                                    name="dataMaxima"
                                    value={props.values.dataMaxima}
                                    data-date-format="dd-mm-yyyy"
                                    className={props.errors.dataMaxima && props.touched.dataMaxima ? "form-control is-invalid" : "form-control"}
                                    id="inputDate"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                />

                                {props.errors.dataMaxima && props.touched.dataMaxima && <p className="text-danger">{props.errors.dataMaxima}</p>}
                            </div>

                        </div>


                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label htmlFor="inputDescriere">Descriere*</label>
                                <textarea
                                    name="descriere"
                                    value={props.values.descriere}
                                    className={props.errors.descriere && props.touched.descriere ? "form-control is-invalid" : "form-control"}
                                    id="inputDescriere"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur} />
                                {props.errors.descriere && props.touched.descriere && <p className="text-danger">{props.errors.descriere}</p>}
                            </div>

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


