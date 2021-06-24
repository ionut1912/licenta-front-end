import React, { useState, useRef } from 'react'
import Notification from '../Notification'
import { Formik } from 'formik';
import Row from './Row'
import * as Yup from "yup";
import ConfirmDialog from '../AdminDashboard/ConfirmDialog'
import cvService from '../../services/cv-service';

export default function ProjectSection(props) {

    const formRef = useRef();

    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

    const [projectExperience, setProjectExperience] = useState(false);
    const [projectFields, setProjectFields] = useState(false);
    const [project, setProject] = useState({
        id: "",
        project_name: "",
        descriere: ""
    });

    function addProject(newProject) {
        props.setCv(prevInfo => {
            return {
                ...prevInfo,
                projects: [...prevInfo.projects, newProject]
            }
        });
    }

    function editProject(id) {

        const project1 = props.cv.projects.filter((projectItem, index) => {
            return index === id;
        });

        setProject({
            id: project1[0].id,
            project_name: project1[0].project_name,
            descriere: project1[0].descriere
        })

        deleteProject(id);

        setProjectFields(true);
    }

    function deleteProject(id) {
        props.setCv(prevInfo => {
            return {
                ...prevInfo,
                projects: prevInfo.projects.filter((projectItem, index) => {
                    return index !== id;
                })
            };
        });
    }

    function deleteProjectPermanent(id) {

        const projectForDelete = props.cv.projects.filter((item, index) => {
            return index === id ? item : null
        })

        props.setCv(prevInfo => {
            return {
                ...prevInfo,
                projects: prevInfo.projects.filter((projectItem, index) => {
                    return index !== id;
                })
            }
        })

        cvService.deleteProject(projectForDelete[0].id).then(
            () => {
                setConfirmDialog({
                    ...confirmDialog,
                    isOpen: false
                })

                setNotify({
                    isOpen: true,
                    message: 'Deleted Successfull!',
                    type: 'error'
                })
            },
            error => {
                setConfirmDialog({
                    ...confirmDialog,
                    isOpen: false
                })

                setNotify({
                    isOpen: true,
                    message: 'Network error!',
                    type: 'error'
                })
            }
        )

    }

    function cleanAndRemoveProjectPermanent() {

        cvService.deleteProject(project.id).then(
            () => {
                setConfirmDialog({
                    ...confirmDialog,
                    isOpen: false
                })

                setNotify({
                    isOpen: true,
                    message: 'Deleted Successfull!',
                    type: 'error'
                })

                setProjectFields(false);

                setProject({
                    id: '',
                    project_name: "",
                    descriere: ""
                })
            },
            error => {
                setConfirmDialog({
                    ...confirmDialog,
                    isOpen: false
                })

                setNotify({
                    isOpen: true,
                    message: 'Network error!',
                    type: 'error'
                })
            }
        )
    }

    function removeProject() {
        if (props.editCv && project.id !== '')
            setConfirmDialog({
                isOpen: true,
                title: 'Are you sure want delete this record?',
                subTitle: "You can't undo this operation, this record will be deleted from datebase!",
                onConfirm: () => cleanAndRemoveProjectPermanent()
            })
        else {
            setProjectFields(false);

            setProject({
                id: '',
                project_name: "",
                descriere: ""
            })
        }
    }

    const clickSectionTitle = () => {
        setProjectExperience(!projectExperience);
        setProjectFields(false);
        formRef.current?.resetForm()

    }

    const formSchema = Yup.object().shape({
        project_name: Yup.string()
            .max(100, "Project name is to long!")
            .matches(/^[a-zA-Z ,.'-]+$/, "Project name can't contains number")
            .required("This field is required!"),
        descriere: Yup.string()
            .max(1000, "Description is to long!")
    })

    function handleSubmit(values) {

        addProject(values);

        setProjectFields(false);

        setProject({
            id: '',
            project_name: "",
            descriere: ""
        })


    }

    return (
        <div className="form-cls">
            <div className="position-relative">
                <h3 className="text-secondary" onClick={() => clickSectionTitle()} ><i className="fa fa-file icon text-dark "></i> Projects</h3>
                {props.cv.projects.length === 0 ? null : <span className="indicator">{props.cv.projects.length}</span>}
            </div>

            <hr className="hr" />
            <div className="projects-section" style={{
                display: projectExperience === false && 'none'
            }}>

                <div className="form-row">
                    {props.cv.projects.length === 0 ? null : (
                        <div className="form-group col-md-12">
                            {props.cv.projects.map((rowItem, index) => {
                                return (
                                    <Row
                                        key={index}
                                        id={index}
                                        rowItem={rowItem}
                                        title={rowItem.project_name}
                                        deletePermanent={props.editCv && rowItem.id !== '' ? true : false}
                                        setConfirmDialog={setConfirmDialog}
                                        onDelete={props.editCv && rowItem.id !== '' ? deleteProjectPermanent : deleteProject}
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
                                id: project.id,
                                project_name: project.project_name,
                                descriere: project.descriere
                            }
                        }

                        onSubmit={(values, { resetForm }) => {
                            const duplicateProject = props.cv.projects.filter((item) => item.project_name === values.project_name)

                            if (duplicateProject.length === 0) {
                                handleSubmit(values);
                                resetForm({ values: '' })
                            }
                            else
                                setNotify({
                                    isOpen: true,
                                    message: "This project already added!",
                                    type: 'error'
                                });
                        }}

                        innerRef={formRef}
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
                                            className={props.errors.project_name && props.touched.project_name ? "form-control is-invalid" : "form-control"}
                                            id="inputProject"
                                            placeholder="ex: Site pentru gestionarea unui magazin online" />
                                        <div className="invalid-feedback">
                                            {props.errors.project_name && props.touched.project_name && <p>{props.errors.project_name}</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <label htmlFor="inputDesc">Description</label>
                                        <textarea
                                            name="descriere"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.descriere}
                                            className={props.errors.descriere && props.touched.descriere ? "form-control is-invalid" : "form-control"}
                                            id="inputDesc"
                                            placeholder="ex: Am folosit Spring boot si React" />
                                        <div className="invalid-feedback">
                                            {props.errors.descriere && props.touched.descriere && <p>{props.errors.descriere}</p>}
                                        </div>
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

                {projectFields === false ? <div className="toggler-additionalInfo">
                    <span className="btn-moreInfo" onClick={() => { setProjectFields(true) }}><i className="fa fa-plus-circle" aria-hidden="true"></i> Add another project</span>
                </div> : null}
                <hr className="hr" />
            </div>

            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </div>
    )
}

