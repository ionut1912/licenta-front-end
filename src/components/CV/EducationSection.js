import React, { useState } from 'react'
import { Formik } from 'formik';
import Row from './Row'
import * as Yup from "yup";

function EducationSection(props) {
    const [educationExperience, setEducationExperience] = useState(false);
    const [educationFields, setEducationFields] = useState(false);
    const [education, setEducation] = useState({
        degree: "",
        city: "",
        school: "",
        start: "",
        end: "",
        descriere: ""
    });

    function deleteEducation(id) {
        props.setEducations(prevEducations => {
            return prevEducations.filter((educationItem, index) => {
                return index !== id;
            });
        });
    }

    function editEducation(id) {

        const education1 = props.educations.filter((educationItem, index) => {
            return index === id;
        });

        setEducation({
            degree: education1[0].degree,
            city: education1[0].city,
            school: education1[0].school,
            start: education1[0].start,
            end: education1[0].end,
            descriere: education1[0].descriere
        })

        deleteEducation(id);

        setEducationFields(true);
    }

    function removeEducation() {

        setEducationFields(false);

        setEducation({
            degree: "",
            city: "",
            school: "",
            start: "",
            end: "",
            descriere: ""
        })

    }

    const formSchema = Yup.object().shape({
        degree: Yup.string()
            .required("This field is required!"),
        school: Yup.string()
            .required("This field is required!"),
        start: Yup.string()
            .required("This field is required!"),
        end: Yup.string()
            .required("This field is required!")
    })

    function handleSubmit(values) {

        props.addEducation(values);

        setEducationFields(false);

        setEducation({
            degree: "",
            city: "",
            school: "",
            start: "",
            end: "",
            descriere: ""
        })

    }

    return (
        <div className="form-cls">
            <div className="position-relative">
                <h3 className="text-secondary" onClick={() => setEducationExperience(!educationExperience)}><i className="fas fa-user-graduate icon text-dark"></i>Education and Qualifications</h3>
                {props.educations.length === 0 ? null : <span class="indicator">{props.educations.length}</span>}
            </div>

            <hr className="hr" />
            <div className="education-section" style={{
                display: educationExperience === false && 'none'
            }}>

                <div className="form-row">
                    {props.educations.length === 0 ? null : (
                        <div className="form-group col-md-12">
                            {props.educations.map((rowItem, index) => {
                                return (
                                    <Row
                                        key={index}
                                        id={index}
                                        title={rowItem.degree}
                                        start={rowItem.start}
                                        end={rowItem.end}
                                        onDelete={deleteEducation}
                                        onEdit={education.degree !== "" ? (() => { }) : editEducation}
                                    />);
                            })}
                        </div>
                    )}
                </div>
                <div className="fields-education" style={{
                    display: educationFields === false && 'none'
                }}>
                    <Formik
                        enableReinitialize={true}

                        initialValues={
                            {
                                degree: education.degree,
                                city: education.city,
                                school: education.school,
                                start: education.start,
                                end: education.end,
                                descriere: education.descriere
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
                                        <label htmlFor="inputDegree">Degree*</label>
                                        <input type="text"
                                            name="degree"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.degree}
                                            className="form-control"
                                            id="inputDegree"
                                            placeholder="Bachelor of Science" />
                                        {props.errors.degree && props.touched.degree && <p className="text-danger">{props.errors.degree}</p>}
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputCity">City</label>
                                        <input type="text"
                                            name="city"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.city}
                                            className="form-control"
                                            id="inputCity" placeholder="" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <label htmlFor="inputSchool">School/Faculty*</label>
                                        <input type="text"
                                            name="school"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.school}
                                            className="form-control"
                                            id="inputSchool"
                                            placeholder="UPIT University" />
                                        {props.errors.school && props.touched.school && <p className="text-danger">{props.errors.school}</p>}
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputStart">Start date*</label>
                                        <input type="date"
                                            name="start"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.start}
                                            className="form-control"
                                            id="inputStart"
                                            placeholder="" />
                                        {props.errors.start && props.touched.start && <p className="text-danger">{props.errors.start}</p>}
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputEnd">End date*</label>
                                        <input type="date"
                                            name="end"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.end}
                                            className="form-control"
                                            id="inputEnd" placeholder="" />
                                        {props.errors.end && props.touched.end && <p className="text-danger">{props.errors.end}</p>}
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <label htmlFor="inputDescriere">Description</label>
                                        <textarea
                                            name="descriere"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.descriere}
                                            className="form-control"
                                            id="inputDescriere"
                                            placeholder="" />
                                    </div>
                                </div>
                                <div className="select-option">
                                    <button type="reset" onClick={() => { removeEducation(); props.resetForm() }} className="btn"><i className="fas fa-trash-alt"></i>Delete</button>
                                    <button type="submit" name="submit" className="btn"><i className="fas fa-save"></i>Save</button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>

                <div className="toggler-additionalInfo">
                    <a href="#/" className="btn-additionalInfo" onClick={() => { setEducationFields(true) }}><i className="fa fa-plus-circle" aria-hidden="true"></i> Add another education to experience</a>
                </div>
                <hr className="hr" />
            </div>
        </div>
    )
}

export default EducationSection
