import React from 'react'
import History from '../Despre/History'
import Testimonial from '../Despre/Testimonial'
import { TestimonialData } from '../Despre/TestimonialData'
import Strenghts from '../Despre/Strenghts'
import { StrenghtsData } from '../Despre/StrenghtsData'
import Locations from '../Despre/Locations'
import Footer from '../Footer';
import Navbar from '../Navbar'

function About() {
    return (
        <div>
            <Navbar/>
            <History />
            <Testimonial data={TestimonialData} />
            <Strenghts strenghts={StrenghtsData} />
            <Locations />
            <Footer />
        </div>
    )
}

export default About
