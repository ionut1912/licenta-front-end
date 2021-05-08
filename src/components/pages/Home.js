import React from 'react'
import Slider from '../Acasa/Slider'
import { SliderData } from '../Acasa/SliderData'
import Services from '../Acasa/ServicesTestimonial'
import { ServicesData } from '../Acasa/ServicesTestimonialData';
import FlexDinamicInfo from '../FlexDinamicInfo'
import { LitleDescriptionData } from '../Acasa/LitleDescriptionData'
import { JobInfoSectionData } from '../Acasa/JobInfoSectionData'
import Footer from '../Footer';

export default function Home() {
    return (
        <div>
            <Slider slides={SliderData} />
            <Services data={ServicesData} />
            <FlexDinamicInfo {...LitleDescriptionData} />
            <FlexDinamicInfo {...JobInfoSectionData} />
            <Footer />
        </div>
    )
}

