import React from 'react'
import './JobSection.css'

export default function JobSection() {

    return (
            <div className='infoHiring-section'>
                <div className="container">
                    <div className="row__item">

                        <div className="col__item">
                            <div className="infoHiring-text-wrapper">
                                <div className="top-line">An oportunitie for you</div>
                                <h1 className='heading'>Do you want a job in our company?</h1>
                                <p className='infoHiring-subtitle'>Crystal System is a community of young and passionate technology enthusiasts. If you are willing to learn, if you are ambitious, if you like challenges, we offer you a career with an international vision, diverse experiences and continuous growth.</p>
                                <a href="/jobs">
                                    <button className="btn btn-primary btn-lg">Join Us</button>
                                </a>
                            </div>
                        </div>

                        <div className="col__item" >
                            <div className="infoHiring-img-wrapper">
                                <img src='./images/job-search.png' alt='img' className="infoHiring-img" />
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
    )
}

