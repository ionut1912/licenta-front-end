import React, { useState, useRef } from 'react'
import { Formik } from 'formik';
import Notification from '../Notification'
import Row from './Row'
import * as Yup from "yup";
import ConfirmDialog from '../AdminDashboard/ConfirmDialog'
import cvService from '../../services/cv-service';

export default function LanguageSection(props) {

    const formRef = useRef();

    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const languageQualifier = [
        { value: '', label: 'Choose' },
        { value: 'A1', label: 'A1 - Utilizator de baza' },
        { value: 'A2', label: 'A2 - Utilizator de baza spre independent' },
        { value: 'B1', label: 'B1 - Utilizator independent' },
        { value: 'B2', label: 'B2 - Utilizator independent spre experimentat' },
        { value: 'C1', label: 'C1 - Utilizator experimentat' },
        { value: 'C2', label: 'C2 - Utilizator experimentat spre nativ' }
    ];

    const [languageExperience, setLanguageExperience] = useState(false);
    const [languageFields, setLanguageFields] = useState(false);
    const [language, setLanguage] = useState({
        id: '',
        language_name: "",
        speak: "",
        read: "",
        write: ""
    });

    function addLanguage(newLanguage) {
        props.setCv(prevInfo => {
            return {
                ...prevInfo,
                languages: [...prevInfo.languages, newLanguage]
            }
        });
    }

    function editLanguage(id) {

        const language1 = props.cv.languages.filter((languageItem, index) => {
            return index === id;
        });

        setLanguage({
            id: language1[0].id,
            language_name: language1[0].language_name,
            speak: language1[0].speak,
            read: language1[0].read,
            write: language1[0].write
        })

        deleteLanguage(id);

        setLanguageFields(true);

    }

    function deleteLanguage(id) {
        props.setCv(prevInfo => {
            return {
                ...prevInfo,
                languages: prevInfo.languages.filter((languageItem, index) => {
                    return index !== id;
                })
            }
        })
    }

    function deleteLanguagePermanent(id) {

        const languageForDelete = props.cv.languages.filter((languageItem, index) => {
            return index === id;
        })

        props.setCv(prevInfo => {
            return {
                ...prevInfo,
                languages: prevInfo.languages.filter((languageItem, index) => {
                    return index !== id;
                })
            }
        })

        cvService.deleteLanguage(languageForDelete[0].id).then(
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

    function cleanAndRemoveLanguagePermanent() {

        cvService.deleteLanguage(language.id).then(
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
                setLanguageFields(false);

                setLanguage({
                    id: '',
                    language_name: "",
                    speak: "",
                    read: "",
                    write: ""
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

    function removeLanguage() {

        if (props.editCv && language.id !== '')
            setConfirmDialog({
                isOpen: true,
                title: 'Are you sure to delete this record?',
                subTitle: "You can't undo this operation, this record will be deleted from datebase!",
                onConfirm: () => cleanAndRemoveLanguagePermanent()
            })
        else {
            setLanguageFields(false);

            setLanguage({
                id: '',
                language_name: "",
                speak: "",
                read: "",
                write: ""
            })
        }

    }

    const clickSectionTitle = () => {
        setLanguageExperience(!languageExperience);
        setLanguageFields(false);
        formRef.current?.resetForm()

    }

    const formSchema = Yup.object().shape({
        language_name: Yup.string()
            .max(70, "Language name is to long!")
            .matches(/^[a-zA-Z ,.'-]+$/, "Language name can't contains number")
            .required("This field is required!"),
        speak: Yup.string()
            .required("This field is required!"),
        read: Yup.string()
            .required("This field is required!"),
        write: Yup.string()
            .required("This field is required!")


    })

    function handleSubmit(values) {
        addLanguage(values);

        setLanguageFields(false);

        setLanguage({
            id: '',
            language_name: "",
            speak: "",
            read: "",
            write: ""
        })

    }

    return (
        <div className="form-cls">

            <div className="position-relative">
                <h3 className="text-secondary" onClick={() => clickSectionTitle()}><i className="fas fa-globe icon text-dark"></i>Languages</h3>
                {props.cv.languages.length === 0 ? null : <span className="indicator">{props.cv.languages.length}</span>}
            </div>

            <hr className="hr" />
            <div className="languages-section" style={{
                display: languageExperience === false && 'none'
            }}>
                <div className="form-row">
                    {props.cv.languages.length === 0 ? null : (
                        <div className="form-group col-md-12">
                            {props.cv.languages.map((rowItem, index) => {
                                return (
                                    <Row
                                        key={index}
                                        id={index}
                                        title={rowItem.language_name}
                                        deletePermanent={props.editCv && rowItem.id !== '' ? true : false}
                                        setConfirmDialog={setConfirmDialog}
                                        onDelete={props.editCv && rowItem.id !== '' ? deleteLanguagePermanent : deleteLanguage}
                                        onEdit={language.language_name !== "" ? (() => { }) : editLanguage}
                                    />);
                            })}
                        </div>
                    )}
                </div>

                <div className="fields-language" style={{
                    display: languageFields === false && 'none'
                }}>
                    <Formik
                        enableReinitialize={true}

                        initialValues={
                            {
                                id: language.id,
                                language_name: language.language_name,
                                speak: language.speak,
                                read: language.read,
                                write: language.write
                            }
                        }

                        onSubmit={(values, { resetForm }) => {

                            const duplicateLanguage = props.cv.languages.filter((item) => item.language_name === values.language_name)

                            if (duplicateLanguage.length === 0) {
                                handleSubmit(values);
                                resetForm({ values: '' });
                            }
                            else
                                setNotify({
                                    isOpen: true,
                                    message: "This language experience already added!",
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
                                        <label htmlFor="inputLanguage">Language *</label>
                                        <input type="text"
                                            name="language_name"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.language_name}
                                            className={props.errors.language_name && props.touched.language_name ? "form-control is-invalid" : "form-control"}
                                            id="inputLanguage"
                                            placeholder="ex:English" />
                                        <div className="invalid-feedback">
                                            {props.errors.language_name && props.touched.language_name && <p>{props.errors.language_name}</p>}
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputSpeech">Speech level*</label>
                                        <select id="inputSpeech"
                                            name="speak"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.speak}
                                            className={props.errors.speak && props.touched.speak ? "form-control is-invalid" : "form-control"}>
                                            {languageQualifier.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.value}>{item.label}</option>
                                                )
                                            })}
                                        </select>
                                        <div className="invalid-feedback">
                                            {props.errors.speak && props.touched.speak && <p>{props.errors.speak}</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputRead">Read level*</label>
                                        <select id="inputRead"
                                            name="read"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.read}
                                            className={props.errors.read && props.touched.read ? "form-control is-invalid" : "form-control"}>
                                            {languageQualifier.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.value}>{item.label}</option>
                                                )
                                            })}
                                        </select>
                                        <div className="invalid-feedback">
                                            {props.errors.read && props.touched.read && <p>{props.errors.read}</p>}
                                        </div>
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputWrite">Write level*</label>
                                        <select id="inputWrite"
                                            name="write"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.write}
                                            className={props.errors.write && props.touched.write ? "form-control is-invalid" : "form-control"}>
                                            {languageQualifier.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.value}>{item.label}</option>
                                                )
                                            })}
                                        </select>
                                        <div className="invalid-feedback">
                                            {props.errors.write && props.touched.write && <p>{props.errors.write}</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="select-option">
                                    <button type="reset" onClick={() => { removeLanguage(); props.resetForm() }} className="btn"><i className="fas fa-trash-alt"></i>Delete</button>
                                    <button type="submit" name="submit" className="btn"><i className="fas fa-save"></i>Save</button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>


                <div className="toggler-additionalInfo">
                    <span className="btn-additionalInfo" onClick={() => { setLanguageFields(true) }}><i className="fa fa-plus-circle" aria-hidden="true"></i> Add another language</span>
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

