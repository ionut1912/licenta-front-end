import React, { useState } from 'react'
import Notification from '../Notification'
import { Formik } from 'formik';
import * as Yup from "yup";
import ConfirmDialog from '../AdminDashboard/ConfirmDialog'
import cvService from '../../services/cv-service';

export default function PersonalDescription(props) {

    const [personalDescription, setPersonalDescription] = useState(false);

    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })


    const formSchema = Yup.object().shape({
        descriere: Yup.string()
            .max(1000, "Descripion is to long!")
            .required("This field is required!"),
    })

    function cleanAndRemoveDescriptionPermanent() {

        cvService.deletePersonalDescription(props.cv.personalDescription.id).then(
            () => {
                setConfirmDialog({
                    ...confirmDialog,
                    isOpen: false
                })

                setNotify({
                    isOpen: true,
                    message: 'Deleted Successfull!',
                    type: 'error'
                });

                props.setCv(prevInfo => {
                    return {
                        ...prevInfo,
                        personalDescription: { descriere: '' }
                    }
                });
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

    function removeDescription() {
        if (props.editCv && props.cv.personalDescription.id !== '')
            setConfirmDialog({
                isOpen: true,
                title: 'Are you sure want delete this record?',
                subTitle: "You can't undo this operation, this record will be deleted from datebase!",
                onConfirm: () => cleanAndRemoveDescriptionPermanent()
            })
        else
            props.setCv(prevInfo => {
                return {
                    ...prevInfo,
                    personalDescription: { descriere: '' }
                }
            });
    }


    function handleSubmit(values) {
        props.setCv(prevInfo => {
            return {
                ...prevInfo,
                personalDescription: values
            }
        });
        setNotify({
            isOpen: true,
            message: 'Description added!',
            type: 'success'
        });
    }

    return (
        <div className="form-cls">
            <div className="position-relative">
                <h3 className="text-secondary" onClick={() => setPersonalDescription(!personalDescription)}><i className="fas fa-user-cog icon text-dark"></i>Personal description</h3>
            </div>

            <hr className="hr" />
            <div className="personalDescription-section" style={{
                display: personalDescription === false && 'none'
            }}>

                <Formik
                    enableReinitialize={true}

                    initialValues={
                        props.cv.personalDescription
                    }

                    onSubmit={(values) => {
                        handleSubmit(values);
                    }}

                    validationSchema={formSchema}>

                    {props => (
                        <form onSubmit={props.handleSubmit} >
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="inputDescrierePersonala">Description</label>
                                    <textarea
                                        name="descriere"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.descriere}
                                        className={props.errors.descriere && props.touched.descriere ? "form-control is-invalid" : "form-control"}
                                        id="inputDescrierePersonala"
                                        placeholder="" />
                                    <div className="invalid-feedback">
                                        {props.errors.descriere && props.touched.descriere && <p>{props.errors.descriere}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="select-option">
                                <button type="reset" onClick={() => { removeDescription(); props.resetForm() }} className="btn"><i className="fas fa-trash-alt"></i>Delete</button>
                                <button type="submit" name="submit" className="btn"><i className="fas fa-save"></i>Save</button>
                            </div>
                        </form>
                    )}
                </Formik>
                <Notification
                    notify={notify}
                    setNotify={setNotify}
                />
                <ConfirmDialog
                    confirmDialog={confirmDialog}
                    setConfirmDialog={setConfirmDialog}
                />
                <hr className="hr" />
            </div>
        </div>
    )
}

