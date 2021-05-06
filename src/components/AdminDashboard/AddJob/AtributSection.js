import React, { useState } from 'react'
import { Formik } from 'formik';
import Row from '../../CV/Row'
import * as Yup from "yup";


function AtributSection(props) {

    const [atributExperience, setAtributExperience] = useState(false);
    const [atributFields, setAtributFields] = useState(false);
    const [atribut, setAtribut] = useState({
        id: '',
        atribut: ""
    });

    //popup pt delete aici
    function deleteAtribut(id) {
        props.setAtributePersonale(prevAtributs => {
            props.setJobInfo(prevInfo => {
                return {
                    ...prevInfo,
                    atributePersonale: prevAtributs.filter((atributItem, index) => {
                        return index !== id;
                    })
                }
            })
            return prevAtributs.filter((atributItem, index) => {
                return index !== id;
            });
        });
    }

    function editAtribut(id) {

        const atribut1 = props.atributePersonale.filter((atributItem, index) => {
            return index === id;
        });


        setAtribut({
            id: atribut1[0].id,
            atribut: atribut1[0].atribut
        })

        deleteAtribut(id);
        setAtributFields(true);
    }

    function removeAtribut() {

        setAtributFields(false);
//popup pt delete aici
        setAtribut({
            id: '',
            atribut: ""
        })


    }

    const formSchema = Yup.object().shape({
        atribut: Yup.string()
            .required("This field is required!"),
    })

    function handleSubmit(values) {

        props.addAtributPersonal(values);

        setAtributFields(false);

        setAtribut({
            id: '',
            atribut: ""
        })

    }
    return (
        <div className="form-cls">
            <div className="position-relative">
                <h3 className="text-secondary" onClick={() => setAtributExperience(!atributExperience)}><i className="fas fa-mouse icon text-dark"></i> Atributes</h3>
                {props.atributePersonale.length === 0 ? null : <span className="indicator">{props.atributePersonale.length}</span>}
            </div>

            <hr className="hr" />
            <div className="atributs-section" style={{
                display: atributExperience === false && 'none'
            }}>

                <div className="form-row">
                    {props.atributePersonale.length === 0 ? null : (
                        <div className="form-group col-md-12">
                            {props.atributePersonale.map((rowItem, index) => {
                                return (
                                    <Row
                                        key={index}
                                        id={index}
                                        title={rowItem.atribut}
                                        onDelete={deleteAtribut}
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
                            handleSubmit(values);
                            resetForm({ values: '' })
                        }}

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
                                            className="form-control"
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
                    <a href="#/" className="btn-moreInfo" onClick={() => { setAtributFields(true) }}><i className="fa fa-plus-circle" aria-hidden="true"></i> Add another atribut to experience</a>
                </div>
                <hr className="hr" />
            </div>
        </div>
    )
}

export default AtributSection
