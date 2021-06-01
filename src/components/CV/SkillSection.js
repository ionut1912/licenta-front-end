import React, { useState, useRef } from 'react'
import Notification from '../Notification'
import ConfirmDialog from '../AdminDashboard/ConfirmDialog'
import { Formik } from 'formik';
import Row from './Row'
import * as Yup from "yup";
import jobService from '../../services/job.service'
import cvService from '../../services/cv-service';

export default function SkillSection(props) {

    const formRef = useRef();

    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const [skillExperience, setSkillExperience] = useState(false);
    const [skillFields, setSkillFields] = useState(false);
    const [skill, setSkill] = useState({
        id: '',
        skill: ""
    });

    function editSkill(id) {

        const skill1 = props.data.skills.filter((skillItem, index) => {
            return index === id;
        });

        setSkill({
            id: skill1[0].id,
            skill: skill1[0].skill
        })

        deleteSkill(id);

        setSkillFields(true);
    }

    function deleteSkill(id) {
        props.setData(prevInfo => {
            return {
                ...prevInfo,
                skills: prevInfo.skills.filter((skillItem, index) => {
                    return index !== id;
                })
            }
        })
    }

    function deleteSkillJobPermanent(id) {

        const skillForDelete = props.data.skills.filter((item, index) => {
            return index === id ? item : null
        })

        props.setData(prevInfo => {
            return {
                ...prevInfo,
                skills: prevInfo.skills.filter((skillItem, index) => {
                    return index !== id;
                })
            }
        })

        jobService.deleteSkill(skillForDelete[0].id).then(
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

    function deleteSkillCvPermanent(id) {

        const skillForDelete = props.data.skills.filter((item, index) => {
            return index === id ? item : null
        })

        props.setData(prevInfo => {
            return {
                ...prevInfo,
                skills: prevInfo.skills.filter((skillItem, index) => {
                    return index !== id;
                })
            }
        })

        cvService.deleteSkill(skillForDelete[0].id).then(
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

    function cleanAndRemoveSkillJobPermanent() {

        jobService.deleteSkill(skill.id).then(
            () => {
                setConfirmDialog({
                    ...confirmDialog,
                    isOpen: false
                });

                setNotify({
                    isOpen: true,
                    message: 'Deleted Successfull!',
                    type: 'error'
                });

                setSkillFields(false);
                setSkill({
                    id: '',
                    skill: ""
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

    function cleanAndRemoveSkillCvPermanent() {

        cvService.deleteSkill(skill.id).then(
            () => {
                setConfirmDialog({
                    ...confirmDialog,
                    isOpen: false
                });

                setNotify({
                    isOpen: true,
                    message: 'Deleted Successfull!',
                    type: 'error'
                });

                setSkillFields(false);
                setSkill({
                    id: '',
                    skill: ""
                });
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

    function removeSkill() {
        if (props.editJob && skill.id !== '')
            setConfirmDialog({
                isOpen: true,
                title: 'Are you sure to delete this record?',
                subTitle: "You can't undo this operation, this record will be deleted from datebase!",
                onConfirm: () => cleanAndRemoveSkillJobPermanent()
            })
        else if (props.editCv && skill.id !== '') {
            setConfirmDialog({
                isOpen: true,
                title: 'Are you sure to delete this record?',
                subTitle: "You can't undo this operation, this record will be deleted from datebase!",
                onConfirm: () => cleanAndRemoveSkillCvPermanent()
            })
        }
        else {
            setSkillFields(false);
            setSkill({
                id: '',
                skill: ""
            })
        }

    }

    const clickSectionTitle = () => {
        setSkillExperience(!skillExperience);
        setSkillFields(false);
        formRef.current?.resetForm()

    }

    const formSchema = Yup.object().shape({
        skill: Yup.string()
            .required("This field is required!"),
    })

    function handleSubmit(values) {
        props.addSkill(values);

        setSkillFields(false);

        setSkill({
            id: '',
            skill: ""
        });
    }

    return (
        <div className="form-cls">
            <div className="position-relative">
                <h3 className="text-secondary" onClick={() => clickSectionTitle()}><i className="fas fa-mouse icon text-dark"></i> Skills</h3>
                {props.data.skills.length === 0 ? null : <span className="indicator">{props.data.skills.length}</span>}
            </div>

            <hr className="hr" />
            <div className="skills-section" style={{
                display: skillExperience === false && 'none'
            }}>

                <div className="form-row">
                    {props.data.skills.length === 0 ? null : (
                        <div className="form-group col-md-12">
                            {props.data.skills.map((rowItem, index) => {
                                return (
                                    <Row
                                        key={index}
                                        id={index}
                                        title={rowItem.skill}
                                        deletePermanent={props.editJob && rowItem.id !== '' ? true : (props.editCv && rowItem.id !== '' ? true : false)}
                                        setConfirmDialog={setConfirmDialog}
                                        onDelete={props.editJob && rowItem.id !== '' ? deleteSkillJobPermanent : (props.editCv && rowItem.id !== '' ? deleteSkillCvPermanent : deleteSkill)}
                                        onEdit={skill.skill !== "" ? (() => { }) : editSkill}
                                    />);
                            })}
                        </div>
                    )}
                </div>

                <div className="fields-skill" style={{
                    display: skillFields === false && 'none'
                }}>
                    <Formik
                        enableReinitialize={true}

                        initialValues={
                            {
                                id: skill.id,
                                skill: skill.skill
                            }
                        }

                        onSubmit={(values, { resetForm }) => {
                            const duplicateSkill = props.data.skills.filter((item) => item.skill === values.skill)

                            if (duplicateSkill.length === 0) {
                                handleSubmit(values);
                                resetForm({ values: '' })
                            }
                            else
                                setNotify({
                                    isOpen: true,
                                    message: "This skill experience already added!",
                                    type: 'error'
                                });
                        }}

                        innerRef={formRef}
                        validationSchema={formSchema}>

                        {props => (
                            <form onSubmit={props.handleSubmit} >

                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <label htmlFor="inputSkill">Skill name*</label>
                                        <input type="text"
                                            name="skill"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.skill}
                                            className={props.errors.skill && props.touched.skill ? "form-control is-invalid" : "form-control"}
                                            id="inputSkill"
                                            placeholder="ex:Java" />
                                        <div className="invalid-feedback">
                                            {props.errors.skill && props.touched.skill && <p>{props.errors.skill}</p>}
                                        </div>
                                    </div>
                                </div>
                                <div className="select-option">
                                    <button type="reset" onClick={() => { removeSkill(); props.resetForm() }} className="btn"><i className="fas fa-trash-alt"></i>Delete</button>
                                    <button type="submit" name="submit" className="btn"><i className="fas fa-save"></i>Save</button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>


                <div className="toggler-additionalInfo">
                    <span className="btn-moreInfo" onClick={() => { setSkillFields(true) }}><i className="fa fa-plus-circle" aria-hidden="true"></i> Add another skill</span>
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