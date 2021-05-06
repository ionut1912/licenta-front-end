import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Banner.css';
import Aos from 'aos';
import "aos/dist/aos.css"

function Banner() {

    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, [])
    return (
        <div id="about" >
            <div className="container" >
                <div className="col-text" >
                    <h1 className="section-title" data-aos="fade-right" data-aos-offset="500">Crystal at a glance</h1>
                    <p data-aos="fade-left" data-aos-offset="500">Crystal System Group is today the IT strategic partner to some of the most influential corporations in Europe.
                    With headquarters in Cyprus, Crystal System has software factories located in Romania, Moldova, Greece and Albania, countries
                    where IT culture is widespread and it is possible to provide cost-effective services to global clients applying the Nearshore Delivery Model.
                    Leveraging the existing quality of the Academic world, over the years we have developed an original education and hiring approach
                    based on partnerships with leading universities.
                    The considerable talent of our IT specialists provides our company with the unique capability of accelerating results and cutting
                    costs while guaranteeing state‐of‐the-art quality, as required by market leaders. By focusing on quality through people, Crystal
                    System Group has gained a competitive edge through extensive international experience in offering value added IT outsourcing
                    consulting and development services.
                    </p>
                    <Link to="/about"><button className="btn btn-primary btn-lg" data-aos="fade-in" data-aos-offset="500">Read more about us</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Banner
