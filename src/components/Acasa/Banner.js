import React from 'react';
import './Banner.css';

function Banner() {

    return (
        <div id="about" >
            <div className="container" >
                <div className="col-text" >
                    <h1 className="section-title">Crystal at a glance</h1>
                    <p>Crystal System Group is today the IT strategic partner to some of the most influential corporations in Europe.
                    With headquarters in Cyprus, Crystal System has software factories located in Romania, Moldova, Greece and Albania, countries
                    where IT culture is widespread and it is possible to provide cost-effective services to global clients applying the Nearshore Delivery Model.
                    Leveraging the existing quality of the Academic world, over the years we have developed an original education and hiring approach
                    based on partnerships with leading universities.
                    The considerable talent of our IT specialists provides our company with the unique capability of accelerating results and cutting
                    costs while guaranteeing state‐of‐the-art quality, as required by market leaders. By focusing on quality through people, Crystal
                    System Group has gained a competitive edge through extensive international experience in offering value added IT outsourcing
                    consulting and development services.
                    </p>
                    <a href="/about"><button className="btn btn-primary btn-lg">Read more about us</button></a>
                </div>
            </div>
        </div>
    )
}

export default Banner
