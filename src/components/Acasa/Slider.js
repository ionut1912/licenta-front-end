import React, { useState, useEffect } from 'react'
import './Slider.css';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import Aos from 'aos';
import "aos/dist/aos.css"
function Slider({ slides }) {

    const [current, setCurrent] = useState(0);
    const length = slides.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    }

    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, [])
    

    if (!Array.isArray(slides) || slides.length <= 0) {
        return null;
    }


    return (

        <div className="carousel slide">
            <BsArrowLeftShort className='left-arrow' onClick={prevSlide} />
            <BsArrowRightShort className='right-arrow' onClick={nextSlide} />
            <div className="carousel-inner">
                {slides.map((slide, index) => {
                    return (
                        <div className="carousel-item active" key={index}>
                            {index === current && <img src={slide.image} alt={"img " + index} />}
                            <div className="carousel-caption">
                                <h2 className="display-2" data-aos="fade-left" data-aos-offset="500">{slide.h2}</h2>
                                <h5><ul>
                                    {slide.h5.map((item, current) => {
                                        return (
                                            <li key={current}  data-aos="fade-left" data-aos-offset="500">{item}</li>
                                        );
                                    })}
                                </ul></h5>



                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Slider
