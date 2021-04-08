import React from 'react'
import './History.css'

function History() {
    return (
        <div id="hist">
            <div className="container flex">
                <div className="col-text">
                    <h1 className="section-title">About Crystal</h1>
                    <p>Founded in 2001 in Bucharest, Crystal System is today a strategic IT partner to some of the largest European companies. Over the years we have developed a wide knowledge in the fields of SAP technologies, Business Intelligence, Web & Cloud & Mobile technologies, and our experts carry out Consultancy, Design, Implementation and Maintenance of IT systems, delivering high quality and time/cost effective outsourcing services.
                    With Software Factories located in Romania and Moldova, we have direct access to one of the world’s highest and finest concentrations of IT specialists. Indeed, this region of East-Europe has a long-dated technology culture and shows a well-established University network strongly focused on computer science, engineering, mathematics and statistics. Over the years, we have developed an original hiring approach based on partnerships with leading universities. We have invested a lot to sustain university course programs (both bachelor and master) that attract the best talented persons from which we select and hire our personnel. The high level talent of the local IT specialists provides our company with the unique capability of accelerating results and cutting costs while maintaining the state‐of‐the art quality required by market leaders.
                    By focalizing on quality through people, Crystal System has gained competitive edge through extensive international experience in offering value added IT outsourcing consulting and development services.
                    </p>
                </div>
                <img className="img" src="./images/parchment.png" alt="img"/>
            </div>
        </div>
    )
}

export default History
