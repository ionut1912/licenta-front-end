import React, { useState, useRef } from 'react'
import { Formik } from 'formik';
import Notification from '../Notification'
import Row from './Row'
import * as Yup from "yup";
import ConfirmDialog from '../AdminDashboard/ConfirmDialog'
import cvService from '../../services/cv-service';

export default function EducationSection(props) {

    const formRef = useRef();

    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const [educationExperience, setEducationExperience] = useState(false);
    const [educationFields, setEducationFields] = useState(false);

    const [education, setEducation] = useState({
        id: '',
        degree: "",
        city: "",
        school: "",
        start: '',
        end: '',
        descriere: ""
    });

    function addEducation(newEducation) {
        props.setCv(prevInfo => {
            return {
                ...prevInfo,
                educations: [...prevInfo.educations, newEducation]
            }
        });
    }

    function editEducation(id) {

        const education1 = props.cv.educations.filter((educationItem, index) => {
            return index === id;
        });

        setEducation({
            id: education1[0].id,
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

    function deleteEducation(id) {
        props.setCv(prevInfo => {
            return {
                ...prevInfo,
                educations: prevInfo.educations.filter((educationItem, index) => {
                    return index !== id;
                })
            }
        })
    }


    function deleteEducationPermanent(id) {

        const educationForDelete = props.cv.educations.filter((educationItem, index) => {
            return index === id;
        })

        props.setCv(prevInfo => {
            return {
                ...prevInfo,
                educations: prevInfo.educations.filter((educationItem, index) => {
                    return index !== id;
                })
            }
        })

        cvService.deleteEducation(educationForDelete[0].id).then(
            () => {
                setConfirmDialog({
                    ...confirmDialog,
                    isOpen: false
                })

                setNotify({
                    isOpen: true,
                    message: 'Deleted Successfull!',
                    type: 'error'
                })
            },
            error => {
                setConfirmDialog({
                    ...confirmDialog,
                    isOpen: false
                })

                setNotify({
                    isOpen: true,
                    message: 'Network error!',
                    type: 'error'
                })
            }
        )
    }

    function cleanAndRemoveEducationPermanent() {

        cvService.deleteEducation(education.id).then(
            () => {
                setConfirmDialog({
                    ...confirmDialog,
                    isOpen: false
                })

                setNotify({
                    isOpen: true,
                    message: 'Deleted Successfull!',
                    type: 'error'
                })

                setEducationFields(false);

                setEducation({
                    id: '',
                    degree: "",
                    city: "",
                    school: "",
                    start: "",
                    end: "",
                    descriere: ""
                })
            },
            error => {
                setConfirmDialog({
                    ...confirmDialog,
                    isOpen: false
                })

                setNotify({
                    isOpen: true,
                    message: 'Network error!',
                    type: 'error'
                })
            }
        )

    }

    function removeEducation() {

        if (props.editCv && education.id !== '')
            setConfirmDialog({
                isOpen: true,
                title: 'Are you sure want delete this record?',
                subTitle: "You can't undo this operation, this record will be deleted from datebase!",
                onConfirm: () => cleanAndRemoveEducationPermanent()
            })
        else {
            setEducationFields(false);

            setEducation({
                id: '',
                degree: "",
                city: "",
                school: "",
                start: "",
                end: "",
                descriere: ""
            })
        }

    }

    const clickSectionTitle = () => {
        setEducationExperience(!educationExperience);
        setEducationFields(false);
        formRef.current?.resetForm()
    }

    const formSchema = Yup.object().shape({
        degree: Yup.string()
            .max(100, "Degree is to long!")
            .matches(/^[a-zA-Z ,.'-]+$/, "Degree can't contains number")
            .required("This field is required!"),
        school: Yup.string()
            .max(45, "School name is to long!")
            .matches(/^[a-zA-Z ,.'-]+$/, "This field can't contains number")
            .required("This field is required!"),
        start: Yup.date()
            .required("This field is required!")
            .max(format(new Date()), "Start date can't be in the future"),
        end: Yup.date()
            .when("onGoing", (onGoing, schema) => onGoing === false ?
                schema.when("start",
                    (start, schema) => start ? schema.required("This field is required!").min(start, "End date can't be before start date") : schema.required("This field is required!")) : schema),
        city: Yup.string()
            .max(45, "City name is to long!")
            .matches(/^[a-zA-Z ,.'-]+$/, "City name can't contains number"),
        descriere: Yup.string()
            .max(500, "Description is to long!")
    })

    function handleSubmit(values) {
        const educationForAdd = {
            id: values.id,
            degree: values.degree,
            city: values.city,
            school: values.school,
            start: values.start,
            end: values.onGoing === false ? values.end : 'In curs',
            descriere: values.descriere
        }
        addEducation(educationForAdd);

        setEducationFields(false);

        setEducation({
            id: '',
            degree: "",
            city: "",
            school: "",
            start: "",
            end: "",
            descriere: ""
        })

    }

    function format(date) {
        return new Intl.DateTimeFormat("fr-CA", {
            year: "numeric",
            month: "2-digit"
        }).format(new Date(date));
    }


    return (
        <div className="form-cls">
            <div className="position-relative">
                <h3 className="text-secondary" onClick={() => clickSectionTitle()}><i className="fas fa-user-graduate icon text-dark"></i>Education and Qualifications</h3>
                {props.cv.educations.length === 0 ? null : <span className="indicator">{props.cv.educations.length}</span>}
            </div>
            <hr className="hr" />
            <div className="education-section" style={{
                display: educationExperience === false && 'none'
            }}>
                <div className="form-row">
                    {props.cv.educations.length === 0 ? null : (
                        <div className="form-group col-md-12">
                            {props.cv.educations.map((rowItem, index) => {
                                return (
                                    <Row
                                        key={index}
                                        id={index}
                                        title={rowItem.degree}
                                        start={rowItem.start}
                                        end={rowItem.end}
                                        deletePermanent={props.editCv && rowItem.id !== '' ? true : false}
                                        setConfirmDialog={setConfirmDialog}
                                        onDelete={props.editCv && rowItem.id !== '' ? deleteEducationPermanent : deleteEducation}
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
                                id: education.id,
                                degree: education.degree,
                                city: education.city,
                                school: education.school,
                                start: education.start,
                                end: education.end !== "In curs" ? education.end : '',
                                onGoing: education.end !== "In curs" ? false : true,
                                descriere: education.descriere
                            }
                        }

                        onSubmit={(values, { resetForm }) => {
                            const duplicateEducation = props.cv.educations.filter((item) => item.degree === values.degree)

                            if (duplicateEducation.length === 0) {
                                handleSubmit(values);
                                resetForm({ values: '' })
                            }
                            else
                                setNotify({
                                    isOpen: true,
                                    message: "This education experience already added!",
                                    type: 'error'
                                });
                        }
                        }

                        innerRef={formRef}
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
                                            className={props.errors.degree && props.touched.degree ? "form-control is-invalid" : "form-control"}
                                            id="inputDegree"
                                            placeholder="Bachelor of Science" />
                                        <div className="invalid-feedback">
                                            {props.errors.degree && props.touched.degree && <p >{props.errors.degree}</p>}
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputCity">City</label>
                                        <input type="text"
                                            name="city"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.city}
                                            className={props.errors.city && props.touched.city ? "form-control is-invalid" : "form-control"}
                                            id="inputCity" placeholder="" />
                                        <div className="invalid-feedback">
                                            {props.errors.city && props.touched.city && <p>{props.errors.city}</p>}
                                        </div>
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
                                            className={props.errors.school && props.touched.school ? "form-control is-invalid" : "form-control"}
                                            id="inputSchool"
                                            placeholder="UPIT University" />
                                        <div className="invalid-feedback">
                                            {props.errors.school && props.touched.school && <p >{props.errors.school}</p>}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-5">
                                        <label htmlFor="inputStart">Start date*</label>
                                        <input type="month"
                                            name="start"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.start}
                                            className={props.errors.start && props.touched.start ? "form-control is-invalid" : "form-control"}
                                            id="inputStart"
                                            placeholder="" />
                                        <div className="invalid-feedback">
                                            {props.errors.start && props.touched.start && <p >{props.errors.start}</p>}
                                        </div>
                                    </div>

                                    <div className="form-group col-md-5">
                                        <label htmlFor="inputEnd">End date*</label>
                                        <input type="month"
                                            name="end"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.end}
                                            className={props.errors.end && props.touched.end ? "form-control is-invalid" : "form-control"}
                                            id="inputEnd" placeholder=""
                                            disabled={props.values.onGoing}
                                        />
                                        <div className="invalid-feedback">
                                            {props.errors.end && props.touched.end && <p >{props.errors.end}</p>}
                                        </div>
                                    </div>

                                    <div className="form-group col-md-2" style={{ display: 'flex', flexDirection: 'column' }}>
                                        <label>Ongoing</label>
                                        <label className="switch">
                                            <input type="checkbox" checked={props.values.onGoing}
                                                onChange={() => { props.setFieldValue('onGoing', !props.values.onGoing) }} />

                                            <span className="slider round"></span>
                                        </label>
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
                                            className={props.errors.descriere && props.touched.descriere ? "form-control is-invalid" : "form-control"}
                                            id="inputDescriere"
                                            placeholder="" />
                                        <div className="invalid-feedback">
                                            {props.errors.descriere && props.touched.descriere && <p>{props.errors.descriere}</p>}
                                        </div>
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
                    <span className="btn-moreInfo" onClick={() => { setEducationFields(true) }}><i className="fa fa-plus-circle" aria-hidden="true"></i> Add another education</span>
                </div>
                <hr className="hr" />
            </div>

            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </div>
    )
}

