import React, { useState } from 'react'


export default function ScrollTop() {

    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        }
        else if (scrolled <= 300) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <i class="fas fa-arrow-up buttonScrollTop" onClick={scrollToTop}
            style={visible === true ? null : { display: 'none' }}></i>
    ) 
}

