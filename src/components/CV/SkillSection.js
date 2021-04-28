import React, { useState } from 'react'
import { Formik } from 'formik';
import Row from './Row'
import * as Yup from "yup";

function SkillSection(props) {

    const [skillExperience, setSkillExperience] = useState(false);
    const [skillFields, setSkillFields] = useState(false);
    const [skill, setSkill] = useState({
        skill: ""
    });

    function deleteSkill(id) {
        props.setSkills(prevSkills => {
            return prevSkills.filter((skillItem, index) => {
                return index !== id;
            });
        });
    }

    function editSkill(id) {

        const skill1 = props.skills.filter((skillItem, index) => {
            return index === id;
        });

        setSkill({
            skill: skill1[0].skill
        })

        deleteSkill(id);

        setSkillFields(true);
    }

    function removeSkill() {

        setSkillFields(false);

        setSkill({
            skill: ""
        })


    }

    const formSchema = Yup.object().shape({
        skill: Yup.string()
            .required("This field is required!"),
    })

    function handleSubmit(values) {

        props.addSkill(values);

        setSkillFields(false);

        setSkill({
            skill: ""
        })

    }

    return (
        <div className="form-cls">
            <div className="position-relative">
                <h3 className="text-secondary" onClick={() => setSkillExperience(!skillExperience)}><i className="fas fa-mouse icon text-dark"></i> Skills</h3>
                {props.skills.length === 0 ? null : <span className="indicator">{props.skills.length}</span>}
            </div>

            <hr className="hr" />
            <div className="skills-section" style={{
                display: skillExperience === false && 'none'
            }}>

                <div className="form-row">
                    {props.skills.length === 0 ? null : (
                        <div className="form-group col-md-12">
                            {props.skills.map((rowItem, index) => {
                                return (
                                    <Row
                                        key={index}
                                        id={index}
                                        title={rowItem.skill}
                                        onDelete={deleteSkill}
                                        onEdit={skill.skill !== "" ? (() => { }) : editSkill}
                                    />);
                            })}
                        </div>
                    )}
                </div>

                <div className="fields-skill" style={{
                    display: skillFields === false && 'none'
                }}>
                    <Formik
                        enableReinitialize={true}

                        initialValues={
                            {
                                skill: skill.skill
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
                                        <label htmlFor="inputSkill">Skill name*</label>
                                        <input type="text"
                                            name="skill"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.skill}
                                            className="form-control"
                                            id="inputSkill"
                                            placeholder="ex:Java" />
                                        {props.errors.skill && props.touched.skill && <p className="text-danger">{props.errors.skill}</p>}
                                    </div>

                                </div>
                                <div className="select-option">
                                    <button type="reset" onClick={() => { removeSkill(); props.resetForm() }} className="btn"><i className="fas fa-trash-alt"></i>Delete</button>
                                    <button type="submit" name="submit" className="btn"><i className="fas fa-save"></i>Save</button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>


                <div className="toggler-additionalInfo">
                    <a href="#/" className="btn-additionalInfo" onClick={() => { setSkillFields(true) }}><i className="fa fa-plus-circle" aria-hidden="true"></i> Add another skill to experience</a>
                </div>
                <hr className="hr" />
            </div>
        </div>
    )
}

export default SkillSection
