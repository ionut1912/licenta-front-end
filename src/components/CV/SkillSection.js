import React, { useState } from 'react'
import { Formik } from 'formik';
import Row from './Row'
import * as Yup from "yup";

function SkillSection(props) {

    const [skillExperience, setSkillExperience] = useState(false);
    const [skillFields, setSkillFields] = useState(false);
    const [skill, setSkill] = useState({
        skill_name: ""
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
            skill_name: skill1[0].skill_name
        })

        deleteSkill(id);

        setSkillFields(true);
    }

    function removeSkill() {

        setSkillFields(false);

        setSkill({
            skill_name: ""
        })


    }

    const formSchema = Yup.object().shape({
        skill_name: Yup.string()
            .required("This field is required!"),
    })

    function handleSubmit(values) {

        props.addSkill(values);

        setSkillFields(false);

        setSkill({
            skill_name: ""
        })

    }

    return (
        <div className="form-cls">
            <h3 className="text-secondary" onClick={() => setSkillExperience(!skillExperience)}><i className="fas fa-mouse icon text-dark"></i> Skills</h3>
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
                                        title={rowItem.skill_name}
                                        onDelete={deleteSkill}
                                        onEdit={skill.skill_name !== "" ? (() => { }) : editSkill}
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
                                skill_name: skill.skill_name
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
                                            name="skill_name"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.skill_name}
                                            className="form-control"
                                            id="inputSkill"
                                            placeholder="ex:Java" />
                                        {props.errors.skill_name && props.touched.skill_name && <p className="text-danger">{props.errors.skill_name}</p>}
                                    </div>

                                </div>
                                <div className="select-option">
                                    <button type="reset" onClick={() => {removeSkill(); props.resetForm()}} className="btn"><i className="fas fa-trash-alt"></i>Delete</button>
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
