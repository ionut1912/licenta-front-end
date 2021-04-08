import React, { useState } from 'react'
import { Formik } from 'formik';
import Row from './Row'
import * as Yup from "yup";

function WorkSection(props) {

    const [workExperience, setWorkExperience] = useState(false);
    const [workFields, setWorkFields] = useState(false);
    const [work, setWork] = useState({
        job_title: "",
        city: "",
        company: "",
        start: "",
        end: "",
        descriere: ""
    });

    function deleteWork(id) {
        props.setWorks(prevWorks => {
            return prevWorks.filter((workItem, index) => {
                return index !== id;
            });
        });
    }

    function editWork(id) {

        const work1 = props.works.filter((workItem, index) => {
            return index === id;
        });

        setWork({
            job_title: work1[0].job_title,
            city: work1[0].city,
            company: work1[0].company,
            start: work1[0].start,
            end: work1[0].end,
            descriere: work1[0].descriere
        })

        deleteWork(id);

        setWorkFields(true);
    }

    function removeWork() {

        setWorkFields(false);

        setWork({
            job_title: "",
            city: "",
            company: "",
            start: "",
            end: "",
            descriere: ""
        })

    }

    const formSchema = Yup.object().shape({
        job_title: Yup.string()
            .required("This field is required!"),
        company: Yup.string()
            .required("This field is required!"),
        start: Yup.string()
            .required("This field is required!"),
        end: Yup.string()
            .required("This field is required!")
    })

    function handleSubmit(values) {

        props.addWork(values);

        setWorkFields(false);

        setWork({
            job_title: "",
            city: "",
            company: "",
            start: "",
            end: "",
            descriere: ""
        })

    }

    return (
        <div className="form-cls">

            <h3 className="text-secondary" onClick={() => setWorkExperience(!workExperience)}><i className="fa fa-briefcase icon text-dark"></i>Work experience</h3>
            <hr className="hr" />
            <div className="work-section" style={{
                display: workExperience === false && 'none'
            }}>

                <div className="form-row">
                    {props.works.length === 0 ? null : (
                        <div className="form-group col-md-12">
                            {props.works.map((rowItem, index) => {
                                return (
                                    <Row
                                        key={index}
                                        id={index}
                                        title={rowItem.job_title}
                                        start={rowItem.start}
                                        end={rowItem.end}
                                        onDelete={deleteWork}
                                        onEdit={work.job_title !== "" ? (() => { }) : editWork}
                                    />);
                            })}
                        </div>
                    )}
                </div>

                <div className="fields-work" style={{
                    display: workFields === false && 'none'
                }}>
                    <Formik
                        enableReinitialize={true}

                        initialValues={
                            {
                                job_title: work.job_title,
                                city: work.city,
                                company: work.company,
                                start: work.start,
                                end: work.end,
                                descriere: work.descriere
                            }
                        }

                        onSubmit={(values, { resetForm }) => {
                            handleSubmit(values);
                            resetForm({ values: '' })
                        }}

                        validationSchema={formSchema}>

                        {props => (
                            <form onSubmit={props.handleSubmit} >

                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputJobTitle">Job title*</label>
                                        <input type="text"
                                            name="job_title"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.job_title}
                                            className="form-control"
                                            id="inputJobTitle"
                                            placeholder="" />
                                        {props.errors.job_title && props.touched.job_title && <p className="text-danger">{props.errors.job_title}</p>}
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputCity2">City</label>
                                        <input type="text"
                                            name="city"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.city}
                                            className="form-control"
                                            id="inputCity2" placeholder="" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <label htmlFor="inputCompany">Company*</label>
                                        <input type="text"
                                            name="company"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.company}
                                            className="form-control"
                                            id="inputCompany" placeholder="" />
                                        {props.errors.company && props.touched.company && <p className="text-danger">{props.errors.company}</p>}
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputStartDate">Start date*</label>
                                        <input type="date"
                                            name="start"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.start}
                                            className="form-control"
                                            id="inputStartDate" placeholder="" />
                                        {props.errors.start && props.touched.start && <p className="text-danger">{props.errors.start}</p>}
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputEndDate">End date*</label>
                                        <input type="date"
                                            name="end"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.end}
                                            className="form-control"
                                            id="inputEndDate" placeholder="" />
                                        {props.errors.end && props.touched.end && <p className="text-danger">{props.errors.end}</p>}
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <label htmlFor="inputDescription">Description</label>
                                        <textarea
                                            name="descriere"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.descriere}
                                            className="form-control"
                                            id="inputDescription" placeholder="" />
                                    </div>
                                </div>
                                <div className="select-option">
                                    <button type="reset" onClick={() => {removeWork(); props.resetForm()}} className="btn"><i className="fas fa-trash-alt"></i>Delete</button>
                                    <button type="submit" name="submit" className="btn"><i className="fas fa-save"></i>Save</button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>

                <div className="toggler-additionalInfo">
                    <a href="#/" className="btn-additionalInfo" onClick={() => { setWorkFields(true) }}><i className="fa fa-plus-circle" aria-hidden="true"></i> Add another work to experience</a>
                </div>
                <hr className="hr" />
            </div>

        </div>
    )
}

export default WorkSection
