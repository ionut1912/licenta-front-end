import React, { useState } from 'react'
import { Formik } from 'formik';
import * as Yup from "yup";

export default function PersonalDescription(props) {

    const [personalDescription, setPersonalDescription] = useState(false);

    const formSchema = Yup.object().shape({
        descriere: Yup.string()
            .required("This field is required!"),
    })

    function removeDescription() {
        props.setDescription({ descriere: '' });
    }

    function handleSubmit(values) {
        props.setDescription(values);
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

                    initialValues={{
                        descriere: ''
                    }}

                    onSubmit={(values) => {
                        handleSubmit(values);
                    }}

                    validationSchema={formSchema}>

                    {props => (
                        <form onSubmit={props.handleSubmit} >
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="inputDescriere">Description</label>
                                    <textarea
                                        name="descriere"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.descriere}
                                        className="form-control"
                                        id="inputDescriere"
                                        placeholder="" />
                                </div>
                            </div>

                            <div className="select-option">
                                <button type="reset" onClick={() => { removeDescription(); props.resetForm() }} className="btn"><i className="fas fa-trash-alt"></i>Delete</button>
                                <button type="submit" name="submit" className="btn"><i className="fas fa-save"></i>Save</button>
                            </div>
                        </form>
                    )}
                </Formik>

                <hr className="hr" />
            </div>
        </div>
    )
}
