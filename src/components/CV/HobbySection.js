import React, { useState, useRef } from 'react'
import { Formik } from 'formik';
import Notification from '../Notification'
import Row from './Row'
import * as Yup from "yup";
import ConfirmDialog from '../AdminDashboard/ConfirmDialog'
import cvService from '../../services/cv-service';

export default function HobbySection(props) {

    const formRef = useRef();

    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const [hobbyExperience, setHobbyExperience] = useState(false);
    const [hobbyFields, setHobbyFields] = useState(false);
    const [hobby, setHobby] = useState({
        id: '',
        hobby_name: ""
    });

    function addHobby(newHobby) {
        props.setCv(prevInfo => {
            return {
                ...prevInfo,
                hobbys: [...prevInfo.hobbys, newHobby]
            }
        });
    }

    function editHobby(id) {

        const hobby1 = props.cv.hobbys.filter((hobbyItem, index) => {
            return index === id;
        });

        setHobby({
            id: hobby1[0].id,
            hobby_name: hobby1[0].hobby_name
        })

        deleteHobby(id);

        setHobbyFields(true);
    }

    function deleteHobby(id) {
        props.setCv(prevInfo => {
            return {
                ...prevInfo,
                hobbys: prevInfo.hobbys.filter((hobbyItem, index) => {
                    return index !== id;
                }
                )
            };
        })
    }

    function deleteHobbyPermanent(id) {

        const hobbyForDelete = props.cv.hobbys.filter((hobbyItem, index) => {
            return index === id;
        })

        props.setCv(prevInfo => {
            return {
                ...prevInfo,
                hobbys: prevInfo.hobbys.filter((hobbyItem, index) => {
                    return index === id;
                }
                )
            };
        })

        cvService.deleteHobby(hobbyForDelete[0].id).then(
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

    function cleanAndRemoveHobbyPermanent() {

        cvService.deleteHobby(hobby.id).then(
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
                setHobbyFields(false);
                setHobby({
                    id: '',
                    hobby_name: ""
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

    function removeHobby() {

        if (props.editCv && hobby.id !== '')
            setConfirmDialog({
                isOpen: true,
                title: 'Are you sure to delete this record?',
                subTitle: "You can't undo this operation, this record will be deleted from datebase!",
                onConfirm: () => cleanAndRemoveHobbyPermanent()
            })
        else {
            setHobbyFields(false);

            setHobby({
                id: '',
                hobby_name: ""
            })
        }
    }

    const clickSectionTitle = () => {
        setHobbyExperience(!hobbyExperience);
        setHobbyFields(false);
        formRef.current?.resetForm()

    }

    const formSchema = Yup.object().shape({
        hobby_name: Yup.string()
            .required("This field is required!"),
    })

    function handleSubmit(values) {

        addHobby(values);

        setHobbyFields(false);

        setHobby({
            id: '',
            hobby_name: ""
        })

    }


    return (
        <div className="form-cls">
            <div className="position-relative">
                <h3 className="text-secondary" onClick={() => clickSectionTitle()}><i className="fas fa-paint-brush icon text-dark"></i>Hobbys</h3>
                {props.cv.hobbys.length === 0 ? null : <span className="indicator">{props.cv.hobbys.length}</span>}
            </div>


            <hr className="hr" />
            <div className="hobbys-section" style={{
                display: hobbyExperience === false && 'none'
            }}>

                <div className="form-row">
                    {props.cv.hobbys.length === 0 ? null : (
                        <div className="form-group col-md-12">
                            {props.cv.hobbys.map((rowItem, index) => {
                                return (
                                    <Row
                                        key={index}
                                        id={index}
                                        title={rowItem.hobby_name}
                                        deletePermanent={props.editCv && rowItem.id !== '' ? true : false}
                                        setConfirmDialog={setConfirmDialog}
                                        onDelete={props.editCv && rowItem.id !== '' ? deleteHobbyPermanent : deleteHobby}
                                        onEdit={hobby.hobby_name !== "" ? (() => { }) : editHobby}
                                    />);
                            })}
                        </div>
                    )}
                </div>

                <div className="fields-hobby" style={{
                    display: hobbyFields === false && 'none'
                }}>
                    <Formik
                        enableReinitialize={true}

                        initialValues={
                            {
                                id: hobby.id,
                                hobby_name: hobby.hobby_name
                            }
                        }

                        onSubmit={(values, { resetForm }) => {
                            const duplicateHobby = props.cv.hobbys.filter((item) => item.hobby_name === values.hobby_name)

                            if (duplicateHobby.length === 0) {
                                handleSubmit(values);
                                resetForm({ values: '' })
                            }
                            else
                                setNotify({
                                    isOpen: true,
                                    message: "The hobby already added!",
                                    type: 'error'
                                });
                        }
                        }

                        innerRef={formRef}
                        validationSchema={formSchema}>

                        {props => (
                            <form onSubmit={props.handleSubmit} >

                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <label htmlFor="inputHobby">Hobby name*</label>
                                        <input type="text"
                                            name="hobby_name"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.hobby_name}
                                            className={props.errors.hobby_name && props.touched.hobby_name ? "form-control is-invalid" : "form-control"}
                                            id="inputHobby"
                                            placeholder="ex:Football" />
                                        <div className="invalid-feedback">
                                            {props.errors.hobby_name && props.touched.hobby_name && <p>{props.errors.hobby_name}</p>}
                                        </div>
                                    </div>
                                </div>
                                <div className="select-option">
                                    <button type="reset" onClick={() => { removeHobby(); props.resetForm() }} className="btn"><i className="fas fa-trash-alt"></i>Delete</button>
                                    <button type="submit" name="submit" className="btn"><i className="fas fa-save"></i>Save</button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>

                <div className="toggler-additionalInfo">
                    <span className="btn-moreInfo" onClick={() => { setHobbyFields(true) }}><i className="fa fa-plus-circle" aria-hidden="true"></i> Add another hobby</span>
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

