import React, { useRef } from 'react';
import { PDFExport } from '@progress/kendo-react-pdf';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LanguageIcon from '@material-ui/icons/Language';
import './PDF.css'


const PDF = (props) => {

  const pdfExportComponent = useRef(null);

  const handleExportWithComponent = (event) => {
    pdfExportComponent.current.save();
  }

  return (
    <div>
      <PDFExport ref={pdfExportComponent} fileName="CV" paperSize="A4" margin={{ top: 20, left: 0, right: 0, bottom: 20 }}>
        <div className="cv-body">

          <h4 className="heading-cv">Curriculum Vitae</h4>
          <hr className="hr" />

          <div className="personal-info">
            <div className="left-side">
              <h6>Personal informations</h6>
              {props.personalInfo.img_cv === '' ? null : <img src={props.personalInfo.img_cv} />}
            </div>

            <div className="right-side">
              <h6 style={{ textTransform: 'none' }}>{props.personalInfo.first_name + " " + props.personalInfo.last_name}</h6>
              <p><EmailIcon className="icon" />{props.personalInfo.email}</p>
              <p><PhoneIcon className="icon" />{props.personalInfo.phone}</p>
              <div className="info-row">
                {props.personalInfo.city === '' && props.personalInfo.address === '' ? null : < LocationOnIcon className="icon" />}
                {props.personalInfo.city === '' ? null : <p>{props.personalInfo.city}</p>}
                {props.personalInfo.city === '' || props.personalInfo.address === '' ? null : <span className="delimitator">|</span>}
                {props.personalInfo.address === '' ? null : <p>{props.personalInfo.address}</p>}
              </div>
              {props.personalInfo.linkedin === '' ? null : <p><LinkedInIcon className="icon" />{props.personalInfo.linkedin}</p>}
              {props.personalInfo.personalSite === '' ? null : <p><LanguageIcon className="icon" />{props.personalInfo.personalSite}</p>}
              <div className="info-row">
                {props.personalInfo.nationality === '' ? null : <p><span className="label">Nationalitate: </span>{props.personalInfo.nationality}</p>}
                {props.personalInfo.nationality === '' ? null : <span className="delimitator">|</span>}
                {props.personalInfo.dateOfBirth === '' ? null : <p><span className="label">Data nasterii: </span>{props.personalInfo.dateOfBirth}</p>}
                {props.personalInfo.drivingLicence === '' || props.personalInfo.dateOfBirth === '' ? null : <span className="delimitator">|</span>}
                {props.personalInfo.drivingLicence === '' ? null : <p><span className="label">Drive licence: </span>{props.personalInfo.drivingLicence}</p>}
              </div>
            </div>
          </div>

          {props.personalDescription.descriere === '' ? null :
            <div className="personal-description">
              <div className="left-side">
                <h6>Personal description</h6>
              </div>
              <p className="right-side">{props.personalDescription.descriere}</p>
            </div>
          }

          {props.works.length === 0 ? null :
            <div className="works">
              <div className="title-category">
                <h6 className="left-side">Work experience</h6>
                <span className="right-side"></span>
              </div>

              {props.works.map((item, index) => {
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

          {props.educations.length === 0 ? null :
            <div className="educations">
              <div className="title-category">
                <h6 className="left-side">Education and qualifications</h6>
                <span className="right-side"></span>
              </div>

              {props.educations.map((item, index) => {
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

          {props.languages.length === 0 ? null :
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

              {props.languages.map((item, index) => {
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

          {props.skills.length === 0 ? null :
            <div className="skills-sec">
              <div className="title-category skill-title">
                <h6 className="left-side">Digital skills</h6>
                <span className="right-side"></span>
              </div>

              <div className="skills">
                <div className="right-side">
                  <ul className="skills-list">
                    {props.skills.map((item, index) => {
                      return (
                        <li key={index}>{item.skill}</li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </div>
          }

          {props.hobbys.length === 0 ? null :
            <div className="hobbys-sec">
              <div className="title-category">
                <h6 className="left-side">Hobby</h6>
                <span className="right-side"></span>
              </div>

              <div className="hobbys">
                <div className="right-side">
                  <ul className="hobbys-list">
                    {props.hobbys.map((item, index) => {
                      return (
                        <li key={index}>{item.hobby_name}</li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </div>
          }
          {props.projects.length === 0 ? null :
            <div className="projects-sec">
              <div className="title-category">
                <h6 className="left-side">Projects</h6>
                <span className="right-side"></span>
              </div>

              {props.projects.map((item, index) => {
                return (
                  <div className="projects" key={index}>
                    <div className="left-side">
                      <p className="name-project">{item.project_name}</p>
                    </div>
                    <div className="right-side">
                      <p>{item.descrire}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          }
        </div>
      </PDFExport>
      <button className="btn btn-primary" style={{ margin: '50px 0 20px 36%' }} onClick={handleExportWithComponent}>Export</button>
    </div>
  )
}

export default PDF;