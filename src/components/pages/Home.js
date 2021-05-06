import React from 'react'
import Slider from '../Acasa/Slider'
import { SliderData } from '../Acasa/SliderData'
import Services from '../Acasa/ServicesSlider'
import { ServicesData } from '../Acasa/ServicesSliderData';
import Banner from '../Acasa/Banner'
import JobSection from '../Acasa/JobSection'
import { JobSectionData } from '../Acasa/JobSectionData'
import Footer from '../Footer';

function Home() {
    return (
        <div>
            <Slider slides={SliderData} />
            <Services data={ServicesData} />
            <Banner />
            <JobSection {...JobSectionData} />
            <Footer />
        </div>
    )
}

export default Home
