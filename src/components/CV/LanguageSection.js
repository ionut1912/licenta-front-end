import React, { useState } from 'react'
import { Formik } from 'formik';
import Row from './Row'
import * as Yup from "yup";

function LanguageSection(props) {

    const [languageExperience, setLanguageExperience] = useState(false);
    const [languageFields, setLanguageFields] = useState(false);
    const [language, setLanguage] = useState({
        language_name: "",
        grad: ""
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
            grad: language1[0].grad
        })

        deleteLanguage(id);

        setLanguageFields(true);

    }

    function removeLanguage() {


        setLanguageFields(false);

        setLanguage({
            language_name: "",
            grad: ""
        })

    }

    const formSchema = Yup.object().shape({
        language_name: Yup.string()
            .required("This field is required!"),


    })

    function handleSubmit(values) {
        console.log(values);
        props.addLanguage(values);

        setLanguageFields(false);

        setLanguage({
            language_name: "",
            grad: ""
        })

     

    }

    return (
        <div className="form-cls">

            <h3 className="text-secondary" onClick={() => setLanguageExperience(!languageExperience)}><i className="fas fa-globe icon text-dark"></i>Languages</h3>
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
                                grad: language.grad
                            }
                        }



                        onSubmit={(values, { resetForm }) => {
                            handleSubmit(values);
                            resetForm({ values: '' });
                        }}

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
                                            className="form-control"
                                            id="inputLanguage"
                                            placeholder="ex:English" />
                                        {props.errors.language_name && props.touched.language_name && <p className="text-danger">{props.errors.language_name}</p>}
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputGrad">Grad</label>
                                        <select id="inputGrad"
                                            name="grad"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.grad}
                                            className="form-control">
                                            <option value="Choose">Choose</option>
                                            <option value="A1">A1</option>
                                            <option value="A2">A2</option>
                                            <option value="B1">B1</option>
                                            <option value="B2">B2</option>
                                            <option value="C1">C1</option>
                                            <option value="C2">C2</option>
                                        </select>
                                        {props.errors.grad && props.touched.grad && <p className="text-danger">{props.errors.grad}</p>}
                                    </div>
                                </div>

                                <div className="select-option">
                                    <button type="reset" onClick={() => {removeLanguage(); props.resetForm()}} className="btn"><i className="fas fa-trash-alt"></i>Delete</button>
                                    <button type="submit" name="submit" className="btn"><i className="fas fa-save"></i>Save</button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>


                <div className="toggler-additionalInfo">
                    <a href="#/" className="btn-additionalInfo" onClick={() => { setLanguageFields(true) }}><i className="fa fa-plus-circle" aria-hidden="true"></i> Add another language to experience</a>
                </div>
                <hr className="hr" />
            </div>

        </div>
    )
}

export default LanguageSection
