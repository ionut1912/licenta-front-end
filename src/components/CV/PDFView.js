import React from 'react';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LanguageIcon from '@material-ui/icons/Language';
import cvService from '../../services/cv-service'

const PDFView = ({ props }) => {

    function format(date) {
        return new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }).format(new Date(date));
    }

    function addEditCv() {

        if (props.editCv === false) {
            cvService.addCv(props.cv).then(
                response => {
                    props.setNotify({
                        isOpen: true,
                        message: 'Cv added with success!',
                        type: 'success'
                    });
                    props.reset();
                    props.setOpenPopup(false);
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    props.setNotify({
                        isOpen: true,
                        message: resMessage,
                        type: 'error'
                    })
                    props.setOpenPopup(false);
                }
            )
        } else {
            cvService.updateCv(props.cv).then(
                response => {
                    props.setNotify({
                        isOpen: true,
                        message: 'Cv updated with success!',
                        type: 'success'
                    });
                    props.reset();
                    props.setEditCv(false);
                    props.setOpenPopup(false);
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    props.setNotify({
                        isOpen: true,
                        message: resMessage,
                        type: 'error'
                    })
                    props.setOpenPopup(false);
                }
            )
        }
    }

    return (
        <div>
            <div className="cv-body">

                <h4 className="heading-cv">Curriculum Vitae</h4>
                <hr className="hr" />

                <div className="personal-info">
                    <div className="left-side">
                        <h6>Personal informations</h6>
                        {props.cv.img_cv === '' || props.cv.img_cv === undefined ? null : <img src={props.cv.img_cv} alt="" />}
                    </div>

                    <div className="right-side">
                        <h6 style={{ textTransform: 'none' }}>{props.cv.first_name + " " + props.cv.last_name}</h6>
                        <p><EmailIcon className="icon" />{props.cv.email}</p>
                        <p><PhoneIcon className="icon" />{props.cv.phone}</p>
                        <div className="info-row">
                            {props.cv.city === '' && props.cv.address === '' ? null : < LocationOnIcon className="icon" />}
                            {props.cv.city === '' ? null : <p>{props.cv.city}</p>}
                            {props.cv.city === '' || props.cv.address === '' ? null : <span className="delimitator">|</span>}
                            {props.cv.address === '' ? null : <p>{props.cv.address}</p>}
                        </div>
                        {props.cv.linkedin === '' ? null : <p><LinkedInIcon className="icon" />{props.cv.linkedin}</p>}
                        {props.cv.personalSite === '' ? null : <p><LanguageIcon className="icon" />{props.cv.personalSite}</p>}
                        <div className="info-row">
                            {props.cv.nationality === '' ? null : <p><span className="label">Nationalitate: </span>{props.cv.nationality}</p>}
                            {props.cv.nationality === '' ? null : <span className="delimitator">|</span>}
                            {props.cv.dateOfBirth === '' || props.cv.dateOfBirth === null ? null : <p><span className="label">Data nasterii: </span>{format(props.cv.dateOfBirth)}</p>}
                            {props.cv.drivingLicence === '' || props.cv.dateOfBirth === '' ? null : <span className="delimitator">|</span>}
                            {props.cv.drivingLicence === '' ? null : <p><span className="label">Drive licence: </span>{props.cv.drivingLicence}</p>}
                        </div>
                    </div>
                </div>

                {props.cv.personalDescription.descriere === '' ? null :
                    <div className="personal-description">
                        <div className="left-side">
                            <h6>Personal description</h6>
                        </div>
                        <p className="right-side">{props.cv.personalDescription.descriere}</p>
                    </div>
                }

                {props.cv.works.length === 0 ? null :
                    <div className="works">
                        <div className="title-category">
                            <h6 className="left-side">Work experience</h6>
                            <span className="right-side"></span>
                        </div>

                        {props.cv.works.map((item, index) => {
                            return (
                                <div className="work-experience" key={index}>
                                    <div className="left-side">
                                        <p className="date-info">{item.start} - {item.end}</p>
                                    </div>
                                    <div className="right-side">
                                        <p className="title-work">{item.job_title}</p>
                                        <p>{item.company}</p>
                                        <p>{item.city}</p>
                                        <p>{item.descriere}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                }

                {props.cv.educations.length === 0 ? null :
                    <div className="educations">
                        <div className="title-category">
                            <h6 className="left-side">Education and qualifications</h6>
                            <span className="right-side"></span>
                        </div>

                        {props.cv.educations.map((item, index) => {
                            return (
                                <div className="education-experience" key={index}>
                                    <div className="left-side">
                                        <p className="date-info">{item.start} - {item.end}</p>
                                    </div>
                                    <div className="right-side">
                                        <p className="title-degree">{item.degree}</p>
                                        <p>{item.school}</p>
                                        <p>{item.city}</p>
                                        <p>{item.descriere}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                }

                {props.cv.languages.length === 0 ? null :
                    <div className="languages-sec">
                        <div className="title-category">
                            <h6 className="left-side">Languages</h6>
                            <span className="right-side"></span>
                        </div>

                        <div className="right-side">
                            <ul className="language-classifer">
                                <li>Speech</li>
                                <li>Read</li>
                                <li>Write</li>
                            </ul>
                        </div>

                        {props.cv.languages.map((item, index) => {
                            return (
                                <div className="languages" key={index}>
                                    <div className="left-side">
                                        <p className="name-language">{item.language_name}</p>
                                    </div>
                                    <div className="right-side">
                                        <ul className="language-classifer">
                                            <li>{item.speak}</li>
                                            <li>{item.read}</li>
                                            <li>{item.write}</li>
                                        </ul>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                }

                {props.cv.skills.length === 0 ? null :
                    <div className="skills-sec">
                        <div className="title-category skill-title">
                            <h6 className="left-side">Digital skills</h6>
                            <span className="right-side"></span>
                        </div>

                        <div className="skills">
                            <div className="right-side">
                                <ul className="skills-list">
                                    {props.cv.skills.map((item, index) => {
                                        return (
                                            <li key={index}>{item.skill}</li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                }

                {props.cv.hobbys.length === 0 ? null :
                    <div className="hobbys-sec">
                        <div className="title-category">
                            <h6 className="left-side">Hobby</h6>
                            <span className="right-side"></span>
                        </div>

                        <div className="hobbys">
                            <div className="right-side">
                                <ul className="hobbys-list">
                                    {props.cv.hobbys.map((item, index) => {
                                        return (
                                            <li key={index}>{item.hobby_name}</li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                }
                {props.cv.projects.length === 0 ? null :
                    <div className="projects-sec">
                        <div className="title-category">
                            <h6 className="left-side">Projects</h6>
                            <span className="right-side"></span>
                        </div>

                        {props.cv.projects.map((item, index) => {
                            return (
                                <div className="projects" key={index}>
                                    <div className="left-side">
                                        <p className="name-project">{item.project_name}</p>
                                    </div>
                                    <div className="right-side">
                                        <p>{item.descriere}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                }
            </div>

            {props.showButton === false ? null :
                <div className="btn-export">
                    <button className="btn btn-primary" onClick={addEditCv}>{props.editCv === false ? "Add cv" : "Update cv"}</button>
                </div>
            }
        </div>
    )
}

export default PDFView;