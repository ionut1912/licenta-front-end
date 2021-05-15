import React, { useState, useRef } from 'react'
import { Formik } from 'formik';
import Row from './Row'
import * as Yup from "yup";

export default function LanguageSection(props) {

    const formRef = useRef();

    const [languageExperience, setLanguageExperience] = useState(false);
    const [languageFields, setLanguageFields] = useState(false);
    const [language, setLanguage] = useState({
        language_name: "",
        speak: "",
        read: "",
        write: ""
    });

    function deleteLanguage(id) {
        props.setLanguages(prevLanguages => {
            return prevLanguages.filter((languageItem, index) => {
                return index !== id;
            });
        });
    }

    function editLanguage(id) {

        const language1 = props.languages.filter((languageItem, index) => {
            return index === id;
        });

        setLanguage({
            language_name: language1[0].language_name,
            speak: language1[0].speak,
            read: language1[0].read,
            write: language1[0].write
        })

        deleteLanguage(id);

        setLanguageFields(true);

    }

    function removeLanguage() {


        setLanguageFields(false);

        setLanguage({
            language_name: "",
            speak: "",
            read: "",
            write: ""
        })

    }

    const clickSectionTitle = () => {
        setLanguageExperience(!languageExperience)
        formRef.current?.resetForm()

    }

    const formSchema = Yup.object().shape({
        language_name: Yup.string()
            .required("This field is required!"),
        speak: Yup.string()
            .required("This field is required!"),
        read: Yup.string()
            .required("This field is required!"),
        write: Yup.string()
            .required("This field is required!")


    })

    function handleSubmit(values) {
        props.addLanguage(values);

        setLanguageFields(false);

        setLanguage({
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
                {props.languages.length === 0 ? null : <span className="indicator">{props.languages.length}</span>}
            </div>

            <hr className="hr" />
            <div className="languages-section" style={{
                display: languageExperience === false && 'none'
            }}>
                <div className="form-row">
                    {props.languages.length === 0 ? null : (
                        <div className="form-group col-md-12">
                            {props.languages.map((rowItem, index) => {
                                return (
                                    <Row
                                        key={index}
                                        id={index}
                                        title={rowItem.language_name}
                                        onDelete={deleteLanguage}
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
                                language_name: language.language_name,
                                speak: language.speak,
                                read: language.read,
                                write: language.write
                            }
                        }



                        onSubmit={(values, { resetForm }) => {
                            handleSubmit(values);
                            resetForm({ values: '' });
                        }}

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
                                        <label htmlFor="inputGrad">Speech level</label>
                                        <select id="inputGrad"
                                            name="speak"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.speak}
                                            className={props.errors.speak && props.touched.speak ? "form-control is-invalid" : "form-control"}>
                                            <option value="">Choose</option>
                                            <option value="A1">A1 - Utilizator de baza</option>
                                            <option value="A2">A2 - Utilizator de baza spre independent</option>
                                            <option value="B1">B1 - Utilizator independent</option>
                                            <option value="B2">B2 - Utilizator independent spre experimentat</option>
                                            <option value="C1">C1 - Utilizator experimentat</option>
                                            <option value="C2">C2 - Utilizator experimentat spre nativ</option>
                                        </select>
                                        <div className="invalid-feedback">
                                            {props.errors.speak && props.touched.speak && <p>{props.errors.speak}</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputGrad">Read level</label>
                                        <select id="inputGrad"
                                            name="read"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.read}
                                            className={props.errors.read && props.touched.read ? "form-control is-invalid" : "form-control"}>
                                            <option value="">Choose</option>
                                            <option value="A1">A1 - Utilizator de baza</option>
                                            <option value="A2">A2 - Utilizator de baza spre independent</option>
                                            <option value="B1">B1 - Utilizator independent</option>
                                            <option value="B2">B2 - Utilizator independent spre experimentat</option>
                                            <option value="C1">C1 - Utilizator experimentat</option>
                                            <option value="C2">C2 - Utilizator experimentat spre nativ</option>
                                        </select>
                                        <div className="invalid-feedback">
                                            {props.errors.read && props.touched.read && <p>{props.errors.read}</p>}
                                        </div>
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputGrad">Write level</label>
                                        <select id="inputGrad"
                                            name="write"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.write}
                                            className={props.errors.write && props.touched.write ? "form-control is-invalid" : "form-control"}>
                                            <option value="">Choose</option>
                                            <option value="A1">A1 - Utilizator de baza</option>
                                            <option value="A2">A2 - Utilizator de baza spre independent</option>
                                            <option value="B1">B1 - Utilizator independent</option>
                                            <option value="B2">B2 - Utilizator independent spre experimentat</option>
                                            <option value="C1">C1 - Utilizator experimentat</option>
                                            <option value="C2">C2 - Utilizator experimentat spre nativ</option>
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

        </div>
    )
}

