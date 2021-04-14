import React, { useState } from 'react'
import { Formik } from 'formik';
import Row from './Row'
import * as Yup from "yup";

function ProjectSection(props) {

    const [projectExperience, setProjectExperience] = useState(false);
    const [projectFields, setProjectFields] = useState(false);
    const [project, setProject] = useState({
        project_name: "",
        descrire: ""
    });

    function deleteProject(id) {
        props.setProjects(prevProjects => {
            return prevProjects.filter((projectItem, index) => {
                return index !== id;
            });
        });
    }

    function editProject(id) {

        const project1 = props.projects.filter((projectItem, index) => {
            return index === id;
        });

        setProject({
            project_name: project1[0].project_name,
            descrire: project1[0].descrire
        })

        deleteProject(id);

        setProjectFields(true);
    }

    function removeProject() {

        setProjectFields(false);

        setProject({
            project_name: "",
            descrire: ""
        })

    }

    const formSchema = Yup.object().shape({
        project_name: Yup.string()
            .required("This field is required!"),
    })

    function handleSubmit(values) {

        props.addProject(values);

        setProjectFields(false);

        setProject({
            project_name: "",
            descrire: ""
        })

    }

    return (
        <div className="form-cls">
            <div className="position-relative">
                <h3 className="text-secondary" onClick={() => setProjectExperience(!projectExperience)} ><i className="fa fa-file icon text-dark "></i> Projects</h3>
                {props.projects.length === 0 ? null : <span class="indicator">{props.projects.length}</span>}
            </div>

            <hr className="hr" />
            <div className="projects-section" style={{
                display: projectExperience === false && 'none'
            }}>

                <div className="form-row">
                    {props.projects.length === 0 ? null : (
                        <div className="form-group col-md-12">
                            {props.projects.map((rowItem, index) => {
                                return (
                                    <Row
                                        key={index}
                                        id={index}
                                        title={rowItem.project_name}
                                        onDelete={deleteProject}
                                        onEdit={project.project_name !== "" ? (() => { }) : editProject}
                                    />);
                            })}
                        </div>
                    )}
                </div>

                <div className="fields-project" style={{
                    display: projectFields === false && 'none'
                }}>
                    <Formik
                        enableReinitialize={true}

                        initialValues={
                            {
                                project_name: project.project_name,
                                descrire: project.descrire
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
                                        <label htmlFor="inputProject">Project*</label>
                                        <input type="text"
                                            name="project_name"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.project_name}
                                            className="form-control"
                                            id="inputProject"
                                            placeholder="ex: Site pentru gestionarea unui magazin online" />
                                        {props.errors.project_name && props.touched.project_name && <p className="text-danger">{props.errors.project_name}</p>}
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <label htmlFor="inputDesc">Description</label>
                                        <textarea
                                            name="descrire"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.descrire}
                                            className="form-control"
                                            id="inputDesc"
                                            placeholder="ex: Am folosit Spring boot si React" />
                                    </div>
                                </div>
                                <div className="select-option">
                                    <button type="reset" onClick={() => { removeProject(); props.resetForm() }} className="btn"><i className="fas fa-trash-alt"></i>Delete</button>
                                    <button type="submit" name="submit" className="btn"><i className="fas fa-save"></i>Save</button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>

                <div className="toggler-additionalInfo">
                    <a href="#/" className="btn-additionalInfo" onClick={() => { setProjectFields(true) }}><i className="fa fa-plus-circle" aria-hidden="true"></i> Add another project to experience</a>
                </div>
                <hr className="hr" />
            </div>
        </div>
    )
}

export default ProjectSection
