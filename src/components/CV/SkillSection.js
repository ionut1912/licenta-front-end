import React, { useState, useRef } from 'react'
import { Formik } from 'formik';
import Row from './Row'
import * as Yup from "yup";

export default function SkillSection(props) {

    const formRef = useRef();

    const [skillExperience, setSkillExperience] = useState(false);
    const [skillFields, setSkillFields] = useState(false);
    const [skill, setSkill] = useState({
        id: '',
        skill: ""
    });
    //popup pt delete aici
    function deleteSkill(id) {
        props.setSkills(prevSkills => {
            if (props.setJobInfo !== undefined) {
                props.setJobInfo(prevInfo => {
                    return {
                        ...prevInfo,
                        skills: prevSkills.filter((skillItem, index) => {
                            return index !== id;
                        })
                    }
                })
            }
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
            id: skill1[0].id,
            skill: skill1[0].skill
        })

        deleteSkill(id);

        setSkillFields(true);
    }
    //popup pt delete aici
    function removeSkill() {

        setSkillFields(false);

        setSkill({
            id: '',
            skill: ""
        })


    }

    const clickSectionTitle = () => {
        setSkillExperience(!skillExperience);
        formRef.current?.resetForm()

    }

    const formSchema = Yup.object().shape({
        skill: Yup.string()
            .required("This field is required!"),
    })

    function handleSubmit(values) {

        props.addSkill(values);

        setSkillFields(false);

        setSkill({
            id: '',
            skill: ""
        })

    }

    return (
        <div className="form-cls">
            <div className="position-relative">
                <h3 className="text-secondary" onClick={() => clickSectionTitle()}><i className="fas fa-mouse icon text-dark"></i> Skills</h3>
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
                                id: skill.id,
                                skill: skill.skill
                            }
                        }

                        onSubmit={(values, { resetForm }) => {
                            handleSubmit(values);
                            resetForm({ values: '' })
                        }}

                        innerRef={formRef}
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
                                            className={props.errors.skill && props.touched.skill ? "form-control is-invalid" : "form-control"}
                                            id="inputSkill"
                                            placeholder="ex:Java" />
                                        <div className="invalid-feedback">
                                            {props.errors.skill && props.touched.skill && <p>{props.errors.skill}</p>}
                                        </div>
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
                    <span className="btn-moreInfo" onClick={() => { setSkillFields(true) }}><i className="fa fa-plus-circle" aria-hidden="true"></i> Add another skill</span>
                </div>
                <hr className="hr" />
            </div>
        </div>
    )
}

