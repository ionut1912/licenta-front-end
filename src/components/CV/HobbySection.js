import React, { useState } from 'react'
import { Formik } from 'formik';
import Row from './Row'
import * as Yup from "yup";

function HobbySection(props) {

    const [hobbyExperience, setHobbyExperience] = useState(false);
    const [hobbyFields, setHobbyFields] = useState(false);
    const [hobby, setHobby] = useState({
        hobby_name: ""
    });

    function deleteHobby(id) {
        props.setHobbys(prevHobbys => {
            return prevHobbys.filter((hobbyItem, index) => {
                return index !== id;
            });
        });
    }

    function editHobby(id) {

        const hobby1 = props.hobbys.filter((hobbyItem, index) => {
            return index === id;
        });

        setHobby({
            hobby_name: hobby1[0].hobby_name
        })

        deleteHobby(id);

        setHobbyFields(true);
    }

    function removeHobby() {

        setHobbyFields(false);

        setHobby({
            hobby_name: ""
        })

    }

    const formSchema = Yup.object().shape({
        hobby_name: Yup.string()
            .required("This field is required!"),
    })

    function handleSubmit(values) {

        props.addHobby(values);

        setHobbyFields(false);

        setHobby({
            hobby_name: ""
        })

    }


    return (
        <div className="form-cls">
            <div className="position-relative">
                <h3 className="text-secondary" onClick={() => setHobbyExperience(!hobbyExperience)}><i className="fas fa-paint-brush icon text-dark"></i>Hobbys</h3>
                {props.hobbys.length === 0 ? null : <span class="indicator">{props.hobbys.length}</span>}
            </div>


            <hr className="hr" />
            <div className="hobbys-section" style={{
                display: hobbyExperience === false && 'none'
            }}>

                <div className="form-row">
                    {props.hobbys.length === 0 ? null : (
                        <div className="form-group col-md-12">
                            {props.hobbys.map((rowItem, index) => {
                                return (
                                    <Row
                                        key={index}
                                        id={index}
                                        title={rowItem.hobby_name}
                                        onDelete={deleteHobby}
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
                                hobby_name: hobby.hobby_name
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
                                        <label htmlFor="inputHobby">Hobby name*</label>
                                        <input type="text"
                                            name="hobby_name"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.hobby_name}
                                            className="form-control"
                                            id="inputHobby"
                                            placeholder="ex:Football" />
                                        {props.errors.hobby_name && props.touched.hobby_name && <p className="text-danger">{props.errors.hobby_name}</p>}
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
                    <a href="#/" className="btn-moreInfo" onClick={() => { setHobbyFields(true) }}><i className="fa fa-plus-circle" aria-hidden="true"></i> Add another hobby to experience</a>
                </div>
                <hr className="hr" />
            </div>
        </div>
    )
}

export default HobbySection
