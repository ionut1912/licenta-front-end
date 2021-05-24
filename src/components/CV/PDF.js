import React, { useRef } from 'react';
import { PDFExport } from '@progress/kendo-react-pdf';
import { Icon, makeStyles } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LanguageIcon from '@material-ui/icons/Language';
import './PDF.css'


const useStyle = makeStyles(theme => ({
  leftSide: {
    textAlign: 'end',
    width: '180px'
  },

  rightSide: {
    width: '300px',
    marginLeft: 'auto',
    '& .MuiIcon-root': {
      fontSize: '10px'
    }
  }
}))

const PDF = (props) => {

  const styles = useStyle();
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
            <div className={styles.leftSide}>
              <h6>Personal informations</h6>
              <img src={props.personalInfo.img_cv} alt="" />
            </div>

            <div className={styles.rightSide}>
              <h6 style={{ textTransform: 'none' }}>Matei Alexandru</h6>
              <p><Icon><EmailIcon className="icon" /></Icon>mateialexandru199@gmail.com</p>
              <p><PhoneIcon className="icon" />0753576489</p>
              <div className="info-row">
                <p><LocationOnIcon className="icon" />Pitesti</p>
                <span class="delimitator">|</span>
                <p> Jud. Arges, Comuna Slobozia, Str. Ion Creanga, nr. 27</p>
              </div>
              <p><LinkedInIcon className="icon" /> mateialexandru@7</p>
              <p><LanguageIcon className="icon" /> www.matei.ro</p>
              <div className="info-row">
                <p><span className="label">Nationalitate: </span>Roman</p>
                <span class="delimitator">|</span>
                <p><span className="label">Data nasterii: </span>02/08/1998</p>
                <span class="delimitator">|</span>
                <p><span className="label">Drive licence: </span>B</p>
              </div>
            </div>
          </div>

          <div className="personal-description">
            <div className={styles.leftSide}>
              <h6>Personal description</h6>
            </div>
            <p className={styles.rightSide}>
              Greu de vorrrrrbit cand e vorba de mine...Daca ar fi sa incep cu ceva as incepe cu faptul ca-mi placesa mi se zica pe al doilea nume,Simona.Iubesc vara si o voi zice in toate descrierile personale.Iubesc caldura,zilele lungi si absolut tot ce tine de ea. Sunt optimista pana in ultimainstanta,sociala mai tot timpul si ca multi de varsta mea dependenta de fenomenul "hi5" simessenger. Arrrrrr fi atatea de zis...Eu sunt 2 persoane intr-una fiind zodia Gemeni, suntschimbatoare si de multe ori mi se spune ca sunt de neinteles. Nu-mi place niciodata solutia demijloc,tind mereu spre o extrema sau alta ,datorita dualitatii personalitatii mele.</p>
          </div>

          <div className="title-category">
            <h6 className={styles.leftSide}>Work experience</h6>
            <span className={styles.rightSide}></span>
          </div>

          <div className="work-experience">
            <div className={styles.leftSide}>
              <p className="date-info">Mar 2012 - Ian 2017</p>
            </div>
            <div className={styles.rightSide}>
              <p className="title-work">React developer</p>
              <p>Endava</p>
              <p>Pitesti</p>
              <p>Eu sunt 2 persoane intr-una fiind zodia Gemeni, suntschimbatoare si de multe ori mi se spune ca sunt de neinteles. Nu-mi place niciodata solutia demijloc,tind mereu spre o extrema sau alta ,datorita dualitatii personalitatii mele.</p>
            </div>
          </div>

          <div className="work-experience">
            <div className={styles.leftSide}>
              <p className="date-info">Mar 2012 - Ian 2017</p>
            </div>
            <div className={styles.rightSide}>
              <p className="title-work">React developer</p>
              <p>Endava</p>
              <p>Pitesti</p>
              <p>Eu sunt 2 persoane intr-una fiind zodia Gemeni, suntschimbatoare si de multe ori mi se spune ca sunt de neinteles. Nu-mi place niciodata solutia demijloc,tind mereu spre o extrema sau alta ,datorita dualitatii personalitatii mele.</p>
            </div>
          </div>

          <div className="work-experience">
            <div className={styles.leftSide}>
              <p className="date-info">Mar 2012 - Ian 2017</p>
            </div>
            <div className={styles.rightSide}>
              <p className="title-work">React developer</p>
              <p>Endava</p>
              <p>Pitesti</p>
              <p>Eu sunt 2 persoane intr-una fiind zodia Gemeni, suntschimbatoare si de multe ori mi se spune ca sunt de neinteles. Nu-mi place niciodata solutia demijloc,tind mereu spre o extrema sau alta ,datorita dualitatii personalitatii mele.</p>
            </div>
          </div>

          <div className="title-category">
            <h6 className={styles.leftSide}>Education and qualifications</h6>
            <span className={styles.rightSide}></span>
          </div>


          <div className="education-experience">
            <div className={styles.leftSide}>
              <p className="date-info">Mar 2012 - Ian 2017</p>
            </div>
            <div className={styles.rightSide}>
              <p className="title-degree">Diploma de licenta</p>
              <p>Upit</p>
              <p>Pitesti</p>
              <p>Eu sunt 2 persoane intr-una fiind zodia Gemeni, suntschimbatoare si de multe ori mi se spune ca sunt de neinteles. Nu-mi place niciodata solutia demijloc,tind mereu spre o extrema sau alta ,datorita dualitatii personalitatii mele.</p>
            </div>
          </div>

          <div className="education-experience">
            <div className={styles.leftSide}>
              <p className="date-info">Mar 2012 - Ian 2017</p>
            </div>
            <div className={styles.rightSide}>
              <p className="title-degree">Diploma de licenta</p>
              <p>Upit</p>
              <p>Pitesti</p>
              <p>Eu sunt 2 persoane intr-una fiind zodia Gemeni, suntschimbatoare si de multe ori mi se spune ca sunt de neinteles. Nu-mi place niciodata solutia demijloc,tind mereu spre o extrema sau alta ,datorita dualitatii personalitatii mele.</p>
            </div>
          </div>

          <div className="title-category">
            <h6 className={styles.leftSide}>Languages</h6>
            <span className={styles.rightSide}></span>
          </div>


          <div className={styles.rightSide}>
            <ul className="language-classifer">
              <li>Speech</li>
              <li>Read</li>
              <li>Write</li>
            </ul>
          </div>

          <div className="languages">
            <div className={styles.leftSide}>
              <p className="date-info">English</p>
            </div>
            <div className={styles.rightSide}>
              <ul className="language-classifer">
                <li>B1</li>
                <li>C2</li>
                <li>B2</li>
              </ul>
            </div>
          </div>

          <div className="languages">
            <div className={styles.leftSide}>
              <p className="date-info">Franch</p>
            </div>
            <div className={styles.rightSide}>
              <ul className="language-classifer">
                <li>A2</li>
                <li>A1</li>
                <li>B1</li>
              </ul>
            </div>
          </div>

          <div className="title-category skill-title">
            <h6 className={styles.leftSide}>Digital skills</h6>
            <span className={styles.rightSide}></span>
          </div>

          <div className="skills">
            <div className={styles.rightSide}>
              <ul className="skills-list">
                <li>Java</li>
                <li>Word</li>
                <li>React</li>
                <li>React</li>
                <li>React</li>
                <li>React</li>
              </ul>
            </div>
          </div>

          <div className="title-category">
            <h6 className={styles.leftSide}>Hobby</h6>
            <span className={styles.rightSide}></span>
          </div>

          <div className="hobbys">
            <div className={styles.rightSide}>
              <ul className="hobbys-list">
                <li>Serials</li>
                <li>Go out with friends</li>
                <li>Footbal</li>
                <li>Dance</li>
                <li>Watch youtube</li>
                <li>FIFA</li>
              </ul>
            </div>
          </div>

          <div className="title-category">
            <h6 className={styles.leftSide}>Projects</h6>
            <span className={styles.rightSide}></span>
          </div>

          <div className="projects">
            <div className={styles.leftSide}>
              <p className="date-info">Wizz air application</p>
            </div>
            <div className={styles.rightSide}>
              <p>Eu sunt 2 persoane intr-una fiind zodia Gemeni, suntschimbatoare si de multe ori mi se spune ca sunt de neinteles. Nu-mi place niciodata solutia demijloc,tind mereu spre o extrema sau alta ,datorita dualitatii personalitatii mele.</p>
            </div>
          </div>
          <div className="projects">
            <div className={styles.leftSide}>
              <p className="date-info">Wizz air application</p>
            </div>
            <div className={styles.rightSide}>
              <p>Eu sunt 2 persoane intr-una fiind zodia Gemeni, suntschimbatoare si de multe ori mi se spune ca sunt de neinteles. Nu-mi place niciodata solutia demijloc,tind mereu spre o extrema sau alta ,datorita dualitatii personalitatii mele.</p>
            </div>
          </div>
          <div className="projects">
            <div className={styles.leftSide}>
              <p className="date-info">Wizz air application</p>
            </div>
            <div className={styles.rightSide}>
              <p>Eu sunt 2 persoane intr-una fiind zodia Gemeni, suntschimbatoare si de multe ori mi se spune ca sunt de neinteles. Nu-mi place niciodata solutia demijloc,tind mereu spre o extrema sau alta ,datorita dualitatii personalitatii mele.</p>
            </div>
          </div>
        </div>
      </PDFExport>
      <button className="btn btn-primary" style={{ marginLeft: "40%", marginTop: "50px" }} onClick={handleExportWithComponent}>Export</button>
    </div>
  )
}

export default PDF;