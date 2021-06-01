import React, { useState, useRef } from 'react'
import Notification from '../../Notification'
import ConfirmDialog from '../ConfirmDialog';
import { Formik } from 'formik';
import Row from '../../CV/Row'
import * as Yup from "yup";
import jobService from '../../../services/job.service';

export default function AtributSection(props) {

    const formRef = useRef();

    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const [atributExperience, setAtributExperience] = useState(false);
    const [atributFields, setAtributFields] = useState(false);
    const [atribut, setAtribut] = useState({
        id: '',
        atribut: ""
    });

    function addAtributPersonal(newAtribute) {
        props.setJobInfo(prevInfo => {
            return {
                ...prevInfo,
                atributePersonale: [...prevInfo.atributePersonale, newAtribute]
            }
        })
    }

    function editAtribut(id) {

        const atribut1 = props.jobInfo.atributePersonale.filter((atributItem, index) => {
            return index === id;
        });

        setAtribut({
            id: atribut1[0].id,
            atribut: atribut1[0].atribut
        })

        deleteAtribut(id);
        setAtributFields(true);
    }

    function deleteAtribut(id) {
        props.setJobInfo(prevInfo => {
            return {
                ...prevInfo,
                atributePersonale: prevInfo.atributePersonale.filter((atributItem, index) => {
                    return index !== id;
                })
            }
        })
    }

    function deleteAtributPermanent(id) {

        const atributForDelete = props.jobInfo.atributePersonale.filter((item, index) => {
            return index === id ? item : null
        })

        props.setJobInfo(prevInfo => {
            return {
                ...prevInfo,
                atributePersonale: prevInfo.atributePersonale.filter((atributItem, index) => {
                    return index !== id;
                })
            }
        })

        jobService.deleteAtributPersonal(atributForDelete[0].id).then(
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

    function cleanAndRemoveAtributPermanent() {

        jobService.deleteAtributPersonal(atribut.id).then(
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

                setAtributFields(false);
                setAtribut({
                    id: '',
                    atribut: ""
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

    function removeAtribut() {
        if (props.editJob && atribut.id !== '')
            setConfirmDialog({
                isOpen: true,
                title: 'Are you sure to delete this record?',
                subTitle: "You can't undo this operation, this record will be deleted from datebase!",
                onConfirm: () => cleanAndRemoveAtributPermanent()
            })
        else {
            setAtributFields(false);
            setAtribut({
                id: '',
                atribut: ""
            })
        }

    }

    const clickSectionTitle = () => {
        setAtributExperience(!atributExperience)
        setAtributFields(false);
        formRef.current?.resetForm()

    }

    const formSchema = Yup.object().shape({
        atribut: Yup.string()
            .required("This field is required!"),
    })

    function handleSubmit(values) {

        addAtributPersonal(values);

        setAtributFields(false);

        setAtribut({
            id: '',
            atribut: ""
        })

    }
    return (
        <div className="form-cls">
            <div className="position-relative">
                <h3 className="text-secondary" onClick={() => clickSectionTitle()}><i className="fas fa-mouse icon text-dark"></i> Atributes</h3>
                {props.jobInfo.atributePersonale.length === 0 ? null : <span className="indicator">{props.jobInfo.atributePersonale.length}</span>}
            </div>

            <hr className="hr" />
            <div className="atributs-section" style={{
                display: atributExperience === false && 'none'
            }}>

                <div className="form-row">
                    {props.jobInfo.atributePersonale.length === 0 ? null : (
                        <div className="form-group col-md-12">
                            {props.jobInfo.atributePersonale.map((rowItem, index) => {
                                return (
                                    <Row
                                        key={index}
                                        id={index}
                                        title={rowItem.atribut}
                                        deletePermanent={props.editJob && rowItem.id !== '' ? true : false}
                                        setConfirmDialog={setConfirmDialog}
                                        onDelete={props.editJob && rowItem.id !== '' ? deleteAtributPermanent : deleteAtribut}
                                        onEdit={atribut.atribut !== "" ? (() => { }) : editAtribut}
                                    />);
                            })}
                        </div>
                    )}
                </div>

                <div className="fields-atribut" style={{
                    display: atributFields === false && 'none'
                }}>
                    <Formik
                        enableReinitialize={true}

                        initialValues={
                            {
                                id: atribut.id,
                                atribut: atribut.atribut
                            }
                        }

                        onSubmit={(values, { resetForm }) => {
                            const duplicateAtribut = props.jobInfo.atributePersonale.filter((item) => item.atribut === values.atribut)

                            if (duplicateAtribut.length === 0) {
                                handleSubmit(values);
                                resetForm({ values: '' })
                            }
                            else
                                setNotify({
                                    isOpen: true,
                                    message: "This atribut experience already added!",
                                    type: 'error'
                                });
                        }}

                        innerRef={formRef}
                        validationSchema={formSchema}>

                        {props => (
                            <form onSubmit={props.handleSubmit} >

                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <label htmlFor="inputAtribut">Atribut name*</label>
                                        <input type="text"
                                            name="atribut"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.atribut}
                                            className={props.errors.atribut && props.touched.atribut ? "form-control is-invalid" : "form-control"}
                                            id="inputAtribut"
                                        />
                                        {props.errors.atribut && props.touched.atribut && <p className="text-danger">{props.errors.atribut}</p>}
                                    </div>

                                </div>
                                <div className="select-option">
                                    <button type="reset" onClick={() => { removeAtribut(); props.resetForm() }} className="btn"><i className="fas fa-trash-alt"></i>Delete</button>
                                    <button type="submit" name="submit" className="btn"><i className="fas fa-save"></i>Save</button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>


                <div className="toggler-additionalInfo">
                    <span className="btn-moreInfo" onClick={() => { setAtributFields(true) }}><i className="fa fa-plus-circle" aria-hidden="true"></i> Add another atribut</span>
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


