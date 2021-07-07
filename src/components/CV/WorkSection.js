import React, { useState, useRef } from 'react'
import Notification from '../Notification'
import Row from './Row'
import { Formik } from 'formik';
import * as Yup from "yup";
import ConfirmDialog from '../AdminDashboard/ConfirmDialog'
import cvService from '../../services/cv-service';

export default function WorkSection(props) {

    const formRef = useRef();

    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const [workExperience, setWorkExperience] = useState(false);
    const [workFields, setWorkFields] = useState(false);
    const [work, setWork] = useState({
        id: '',
        job_title: "",
        city: "",
        company: "",
        start: '',
        end: "",
        descriere: ""
    });

    function addWork(newWork) {
        props.setCv(prevInfo => {
            return {
                ...prevInfo,
                works: [...prevInfo.works, newWork]
            }
        });
    }

    function editWork(id) {

        const work1 = props.cv.works.filter((workItem, index) => {
            return index === id;
        });

        setWork({
            id: work1[0].id,
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

    function deleteWork(id) {
        props.setCv(prevInfo => {
            return {
                ...prevInfo,
                works: prevInfo.works.filter((workItem, index) => {
                    return index !== id;
                })
            }
        })
    }

    function deleteWorkPermanent(id) {

        const workForDelete = props.cv.works.filter((workItem, index) => {
            return index === id;
        })

        props.setCv(prevInfo => {
            return {
                ...prevInfo,
                works: prevInfo.works.filter((workItem, index) => {
                    return index !== id;
                })
            }
        })

        cvService.deleteWork(workForDelete[0].id).then(
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

    function cleanAndRemoveWorkPermanent() {

        cvService.deleteWork(work.id).then(
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

                setWorkFields(false);

                setWork({
                    id: '',
                    job_title: "",
                    city: "",
                    company: "",
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


    function removeWork() {
        if (props.editCv && work.id !== '')
            setConfirmDialog({
                isOpen: true,
                title: 'Are you sure want delete this record?',
                subTitle: "You can't undo this operation, this record will be deleted from datebase!",
                onConfirm: () => cleanAndRemoveWorkPermanent()
            })
        else {
            setWorkFields(false);

            setWork({
                id: '',
                job_title: "",
                city: "",
                company: "",
                start: "",
                end: "",
                descriere: ""
            })
        }

    }

    const clickSectionTitle = () => {
        setWorkExperience(!workExperience)
        setWorkFields(false);
        formRef.current?.resetForm()

    }

    const formSchema = Yup.object().shape({
        job_title: Yup.string()
            .max(100, "Job title is to long!")
            .matches(/^[a-zA-Z ,.'-]+$/, "Job title can't contains number or symbols")
            .required("This field is required!"),
        company: Yup.string()
            .max(45, "Company name is to long!")
            .matches(/^[a-zA-Z ,.'-]+$/, "Company name can't contains number or symbols")
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
            .matches(/^[a-zA-Z ,.'-]+$/, "City name can't contains number or symbols"),
        descriere: Yup.string()
            .max(500, "Description is to long!")

    })

    function handleSubmit(values) {

        const workForAdd = {
            id: values.id,
            job_title: values.job_title,
            city: values.city,
            company: values.company,
            start: values.start,
            end: values.onGoing === false ? values.end : 'In curs',
            descriere: values.descriere
        }

        addWork(workForAdd);

        setWorkFields(false);

        setWork({
            id: '',
            job_title: "",
            city: "",
            company: "",
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
                <h3 className="text-secondary" onClick={() => clickSectionTitle()}><i className="fa fa-briefcase icon text-dark"></i>Work experience</h3>
                {props.cv.works.length === 0 ? null : <span className="indicator">{props.cv.works.length}</span>}
            </div>


            <hr className="hr" />
            <div className="work-section" style={{
                display: workExperience === false && 'none'
            }}>

                <div className="form-row">
                    {props.cv.works.length === 0 ? null : (
                        <div className="form-group col-md-12">
                            {props.cv.works.map((rowItem, index) => {
                                return (
                                    <Row
                                        key={index}
                                        id={index}
                                        title={rowItem.job_title}
                                        start={rowItem.start}
                                        end={rowItem.end}
                                        deletePermanent={props.editCv && rowItem.id !== '' ? true : false}
                                        setConfirmDialog={setConfirmDialog}
                                        onDelete={props.editCv && rowItem.id !== '' ? deleteWorkPermanent : deleteWork}
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
                                id: work.id,
                                job_title: work.job_title,
                                city: work.city,
                                company: work.company,
                                start: work.start,
                                end: work.end !== "In curs" ? work.end : '',
                                onGoing: work.end !== "In curs" ? false : true,
                                descriere: work.descriere
                            }
                        }

                        onSubmit={(values, { resetForm }) => {
                            const duplicateWork = props.cv.works.filter((item) => item.job_title === values.job_title)

                            if (duplicateWork.length === 0) {
                                handleSubmit(values);
                                resetForm({ values: '' })
                            } else
                                setNotify({
                                    isOpen: true,
                                    message: "This work experience already added!",
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
                                        <label htmlFor="inputJobTitle">Job title*</label>
                                        <input type="text"
                                            name="job_title"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.job_title}
                                            className={props.errors.job_title && props.touched.job_title ? "form-control is-invalid" : "form-control"}
                                            id="inputJobTitle"
                                            placeholder="" />
                                        <div className="invalid-feedback">
                                            {props.errors.job_title && props.touched.job_title && <p>{props.errors.job_title}</p>}
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputCity2">City</label>
                                        <input type="text"
                                            name="city"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.city}
                                            className={props.errors.city && props.touched.city ? "form-control is-invalid" : "form-control"}
                                            id="inputCity2" placeholder="" />
                                        <div className="invalid-feedback">
                                            {props.errors.city && props.touched.city && <p>{props.errors.city}</p>}
                                        </div>
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
                                            className={props.errors.company && props.touched.company ? "form-control is-invalid" : "form-control"}
                                            id="inputCompany" placeholder="" />
                                        <div className="invalid-feedback">
                                            {props.errors.company && props.touched.company && <p>{props.errors.company}</p>}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-5">
                                        <label htmlFor="inputStartDate">Start date*</label>
                                        <input type="month"
                                            name="start"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.start}
                                            className={props.errors.start && props.touched.start ? "form-control is-invalid" : "form-control"}
                                            id="inputStartDate" placeholder="" />
                                        <div className="invalid-feedback">
                                            {props.errors.start && props.touched.start && <p >{props.errors.start}</p>}
                                        </div>
                                    </div>

                                    <div className="form-group col-md-5">
                                        <label htmlFor="inputEndDate">End date*</label>
                                        <input type="month"
                                            name="end"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.end}
                                            className={props.errors.end && props.touched.end ? "form-control is-invalid" : "form-control"}
                                            id="inputEndDate"
                                            disabled={props.values.onGoing} />
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
                                        <label htmlFor="inputDescription">Description</label>
                                        <textarea
                                            name="descriere"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.descriere}
                                            className={props.errors.descriere && props.touched.descriere ? "form-control is-invalid" : "form-control"}
                                            id="inputDescription" placeholder="" />
                                        <div className="invalid-feedback">
                                            {props.errors.descriere && props.touched.descriere && <p>{props.errors.descriere}</p>}
                                        </div>
                                    </div>
                                </div>
                                <div className="select-option">
                                    <button type="reset" onClick={() => { removeWork(); props.resetForm() }} className="btn"><i className="fas fa-trash-alt"></i>Delete</button>
                                    <button type="submit" name="submit" className="btn"><i className="fas fa-save"></i>Save</button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>

                {workFields === false ? <div className="toggler-additionalInfo">
                    <span className="btn-moreInfo" onClick={() => { setWorkFields(true) }}><i className="fa fa-plus-circle" aria-hidden="true"></i> Add another work</span>
                </div> : null}
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

