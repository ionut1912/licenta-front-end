import React from 'react'
import Slider from '../Acasa/Slider'
import { SliderData } from '../Acasa/SliderData'
import Services from '../Acasa/ServicesTestimonial'
import { ServicesData } from '../Acasa/ServicesTestimonialData';
import Banner from '../Acasa/Banner'
import JobSection from '../Acasa/JobSection'
import Footer from '../Footer';

export default function Home() {
    return (
        <div>
            <Slider slides={SliderData} />
            <Services data={ServicesData} />
            <Banner />
            <JobSection />
            <Footer />
        </div>
    )
}

