import React, { useState } from 'react'
import { Formik } from 'formik';
import Row from '../../CV/Row'
import * as Yup from "yup";

function DetaliuSection(props) {
    const [detaliuExperience, setDetaliuExperience] = useState(false);
    const [detaliuFields, setDetaliuFields] = useState(false);
    const [detaliu, setDetaliu] = useState({
        detaliu: ""
    });

    function deleteDetaliu(id) {
        props.setDetalii(prevDetalius => {
            return prevDetalius.filter((detaliuItem, index) => {
                return index !== id;
            });
        });
    }

    function editDetaliu(id) {

        const detaliu1 = props.detalii.filter((detaliuItem, index) => {
            return index === id;
        });

        setDetaliu({
            detaliu: detaliu1[0].detaliu
        })

        deleteDetaliu(id);

        setDetaliuFields(true);
    }

    function removeDetaliu() {

        setDetaliuFields(false);

        setDetaliu({
            detaliu: ""
        })


    }

    const formSchema = Yup.object().shape({
        detaliu: Yup.string()
            .required("This field is required!"),
    })

    function handleSubmit(values) {

        props.addDetaliu(values);

        setDetaliuFields(false);

        setDetaliu({
            detaliu: ""
        })

    }
    return (
        <div className="form-cls">
            <div className="position-relative">
                <h3 className="text-secondary" onClick={() => setDetaliuExperience(!detaliuExperience)}><i className="fas fa-mouse icon text-dark"></i> Details</h3>
                {props.detalii.length === 0 ? null : <span className="indicator">{props.detalii.length}</span>}
            </div>

            <hr className="hr" />
            <div className="detalii-section" style={{
                display: detaliuExperience === false && 'none'
            }}>

                <div className="form-row">
                    {props.detalii.length === 0 ? null : (
                        <div className="form-group col-md-12">
                            {props.detalii.map((rowItem, index) => {
                                return (
                                    <Row
                                        key={index}
                                        id={index}
                                        title={rowItem.detaliu}
                                        onDelete={deleteDetaliu}
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
                                detaliu: detaliu.detaliu
                            }
                        }

                        onSubmit={(values, { resetForm }) => {
                            handleSubmit(values);
                            resetForm({ values: '' })
                        }}

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
                                            className="form-control"
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
                    <a href="#/" className="btn-additionalInfo" onClick={() => { setDetaliuFields(true) }}><i className="fa fa-plus-circle" aria-hidden="true"></i> Add another detaliu to experience</a>
                </div>
                <hr className="hr" />
            </div>
        </div>
    )
}

export default DetaliuSection
