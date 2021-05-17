import React from 'react';
import Pdf from 'react-to-pdf';
import './PDF.css'

const ref = React.createRef();

const PDF = (props) => {

  return (
    <div ref={ref}>
      <div className="cv-body" >
        <div className="personal-info">

          <div style={{ maxWidth: "400px" }}>
            <img src={props.personalInfo.img_cv} alt="" />
          </div>

          <div className="more-info">
            {props.personalInfo.dateOfBirth && <p>Data nasterii: {props.personalInfo.dateOfBirth}</p>}
            {props.personalInfo.nationality && <p>Nationality: {props.personalInfo.nationality}</p>}
            {props.personalInfo.drivingLicence && <p>Driving licens: {props.personalInfo.drivingLicence}</p>}
          </div>

          <div className="personal-section">
            <div className="aboutMe">
              <h1><span>ABOUT ME</span></h1>

              <p>Your personal statement is one of the most important parts of your CV.
              It gives you a chance to sell yourself to the employer in a small and easy-to-digest paragraph. By summing up the specific skills and experience that make you perfect for the position, you’ll be able to prove your suitability and convince the recruiter to read on.
            In fact, a well written personal statement can mean the difference between standing out from the crowd and your application being rejected.</p>
            </div>

            <div className="contact-section">
              <h1><span>CONTACT</span></h1>

              <p><i className="fa fa-envelope" aria-hidden="true"></i>{props.personalInfo.email}</p>
              <p><i className="fa fa-phone" aria-hidden="true"></i>{props.personalInfo.phone}</p>
              {props.personalInfo.address &&
                <div>
                  <i className="fas fa-map-marker-alt"></i>
                  <p style={{ position: "relative", marginLeft: "40px", top: "-30px", width: "300px" }}>{props.personalInfo.address}</p>
                </div>
              }

            </div>

            {(props.personalInfo.linkedin || props.personalInfo.personalSite) &&
              <div className="social-links">
                <h1><span>LINKS</span></h1>
                {props.personalInfo.linkedin && <p><a href="#/"><i className="fab fa-linkedin"></i>{props.personalInfo.linkedin}</a></p>}
                {props.personalInfo.personalSite && <p><a href="#/"><i className="fas fa-globe"></i>{props.personalInfo.personalSite}</a></p>}
              </div>
            }
          </div>
        </div>

        <div className="experience-info">

          <h1>{props.personalInfo.first_name} {props.personalInfo.last_name} </h1>


          {props.works.length !== 0 &&
            <div className="carrer-section">
              <h2><span>Carrer</span></h2>
              {props.works.map((item, index) => {
                return (
                  <div className="experience-every-content" key={index}>
                    <div className="content-title">
                      <h4>{item.start}-{item.end}</h4>
                      <div className="title-comp">
                        <h4>{item.job_title}</h4>
                      </div>
                    </div>

                    <div className="content-body">
                      <div>
                        <h4>{item.company}</h4>
                        {item.city && <p>{item.city}</p>}
                      </div>
                      {item.descriere && <p className="content-description">{item.descriere}</p>}
                    </div>

                  </div>);
              })}
            </div>
          }

          {props.educations.length !== 0 &&
            <div className="education-section">
              <h2><span>Education</span></h2>

              {props.educations.map((item, index) => {
                return (
                  <div className="experience-every-content" key={index}>
                    <div className="content-title">
                      <h4>{item.start}-{item.end}</h4>
                      <div className="title-comp">
                        <h4>{item.degree}</h4>
                      </div>
                    </div>

                    <div className="content-body">
                      <div>
                        <h4>{item.school}</h4>
                        {item.city && <p>{item.city}</p>}
                      </div>

                      {item.descriere && <p className="content-description">{item.descriere}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          }

          {props.skills.length !== 0 &&
            <div className="skills-section">
              <h2><span>Skills</span></h2>

              <ul className="skills-list">
                {props.skills.map((item, index) => {
                  return (
                    <li key={index}>{item.skill}</li>
                  );
                })}
              </ul>
            </div>
          }

          {props.languages.length !== 0 &&
            <div className="languages-section">
              <h2><span>Languages</span></h2>
              <ul className="languages-list">
                {props.languages.map((item, index) => {
                  return (
                    <li key={index}>
                      <p>{item.language_name}</p>
                      <p style={{ marginLeft: "20px" }}>{item.speak}</p>
                      <p style={{ marginLeft: "20px" }}>{item.read}</p>
                      <p style={{ marginLeft: "20px" }}>{item.write}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          }

          {props.hobbys.length !== 0 &&
            <div className="hobbys-section">
              <h2><span>Hobbys</span></h2>
              <ul className="hobbys-list">
                {props.hobbys.map((item, index) => {
                  return (
                    <li key={index}>{item.hobby_name}</li>
                  );
                })}
              </ul>
            </div>
          }

          {props.projects.length !== 0 &&
            <div className="projects-section">
              <h2><span>Projects</span></h2>

              {props.projects.map((item, index) => {
                return (
                  <div className="experience-every-content" key={index}>
                    <div className="content-body">
                      <h4 style={{ color: "#0275d8" }}>{item.project_name}</h4>
                      <p className="content-description">{item.descrire}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          }

        </div>
      </div>

      <Pdf targetRef={ref} filename="post.pdf">
        {({ toPdf }) => <button onClick={toPdf}>Capture as PDF</button>}
      </Pdf>
    </div>
  )
}

export default PDF;