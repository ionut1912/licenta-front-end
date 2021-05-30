import React, { useState, useRef } from 'react'
import Notification from '../../Notification'
import ConfirmDialog from '../ConfirmDialog';
import { Formik } from 'formik';
import Row from '../../CV/Row'
import * as Yup from "yup";
import jobService from '../../../services/job.service';

export default function DetaliuSection(props) {

    const formRef = useRef();

    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const [detaliuExperience, setDetaliuExperience] = useState(false);
    const [detaliuFields, setDetaliuFields] = useState(false);
    const [detaliu, setDetaliu] = useState({
        id: '',
        detaliu: ""
    });

    function deleteDetaliu(id) {
        props.setJobInfo(prevInfo => {
            return {
                ...prevInfo,
                moreDetails: prevInfo.moreDetails.filter((detaliuItem, index) => {
                    return index !== id;
                })
            }
        });
    }

    function deleteDetaliuPermanent(id) {

        const detaliuForDelete = props.jobInfo.moreDetails.filter((item, index) => {
            return index === id ? item : null
        })

        props.setJobInfo(prevInfo => {
            return {
                ...prevInfo,
                moreDetails: prevInfo.moreDetails.filter((detaliuItem, index) => {
                    return index !== id;
                })
            }
        })

        jobService.deleteDetaliu(detaliuForDelete[0].id).then(
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

    function editDetaliu(id) {

        const detaliu1 = props.jobInfo.moreDetails.filter((detaliuItem, index) => {
            return index === id;
        });

        setDetaliu({
            id: detaliu1[0].id,
            detaliu: detaliu1[0].detaliu
        })

        deleteDetaliu(id);

        setDetaliuFields(true);
    }

    function cleanAndRemoveDetailPermanent() {

        setDetaliuFields(false);

        jobService.deleteDetaliu(detaliu.id).then(
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

        setDetaliu({
            id: '',
            detaliu: ""
        })
    }

    function removeDetaliu() {

        if (props.editJob && detaliu.id !== '')
            setConfirmDialog({
                isOpen: true,
                title: 'Are you sure to delete this record?',
                subTitle: "You can't undo this operation, this record will be deleted from datebase!",
                onConfirm: () => cleanAndRemoveDetailPermanent()
            })
        else {
            setDetaliuFields(false);
            setDetaliu({
                id: '',
                detaliu: ""
            })
        }

    }

    const clickSectionTitle = () => {
        setDetaliuExperience(!detaliuExperience)
        setDetaliuFields(false);
        formRef.current?.resetForm()

    }

    const formSchema = Yup.object().shape({
        detaliu: Yup.string()
            .required("This field is required!"),
    })

    function handleSubmit(values) {

        props.addDetaliu(values);

        setDetaliuFields(false);

        setDetaliu({
            id: '',
            detaliu: ""
        })

    }
    return (
        <div className="form-cls">
            <div className="position-relative">
                <h3 className="text-secondary" onClick={() => clickSectionTitle()}><i className="fas fa-mouse icon text-dark"></i> Details</h3>
                {props.jobInfo.moreDetails.length === 0 ? null : <span className="indicator">{props.jobInfo.moreDetails.length}</span>}
            </div>

            <hr className="hr" />
            <div className="detalii-section" style={{
                display: detaliuExperience === false && 'none'
            }}>

                <div className="form-row">
                    {props.jobInfo.moreDetails.length === 0 ? null : (
                        <div className="form-group col-md-12">
                            {props.jobInfo.moreDetails.map((rowItem, index) => {
                                return (
                                    <Row
                                        key={index}
                                        id={index}
                                        title={rowItem.detaliu}
                                        deletePermanent={props.editJob && rowItem.id !== '' ? true : false}
                                        setConfirmDialog={setConfirmDialog}
                                        onDelete={props.editJob && rowItem.id !== '' ? deleteDetaliuPermanent : deleteDetaliu}
                                        onEdit={detaliu.detaliu !== "" ? (() => { }) : editDetaliu}
                                    />);
                            })}
                        </div>
                    )}
                </div>

                <div className="fields-detaliu" style={{
                    display: detaliuFields === false && 'none'
                }}>
                    <Formik
                        enableReinitialize={true}

                        initialValues={
                            {
                                id: detaliu.id,
                                detaliu: detaliu.detaliu
                            }
                        }

                        onSubmit={(values, { resetForm }) => {
                            const duplicateDetail = props.jobInfo.moreDetails.filter((item) => item.detaliu === values.detaliu)

                            if (duplicateDetail.length === 0) {
                                handleSubmit(values);
                                resetForm({ values: '' })
                            }
                            else
                                setNotify({
                                    isOpen: true,
                                    message: "This detail already added!",
                                    type: 'error'
                                });
                        }}

                        innerRef={formRef}
                        validationSchema={formSchema}>

                        {props => (
                            <form onSubmit={props.handleSubmit} >

                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <label htmlFor="inputDetaliu">Detaliu name*</label>
                                        <input type="text"
                                            name="detaliu"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.detaliu}
                                            className={props.errors.detaliu && props.touched.detaliu ? "form-control is-invalid" : "form-control"}
                                            id="inputDetaliu"
                                        />
                                        {props.errors.detaliu && props.touched.detaliu && <p className="text-danger">{props.errors.detaliu}</p>}
                                    </div>

                                </div>
                                <div className="select-option">
                                    <button type="reset" onClick={() => { removeDetaliu(); props.resetForm() }} className="btn"><i className="fas fa-trash-alt"></i>Delete</button>
                                    <button type="submit" name="submit" className="btn"><i className="fas fa-save"></i>Save</button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>


                <div className="toggler-additionalInfo">
                    <span className="btn-moreInfo" onClick={() => { setDetaliuFields(true) }}><i className="fa fa-plus-circle" aria-hidden="true"></i> Add another detaliu</span>
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

