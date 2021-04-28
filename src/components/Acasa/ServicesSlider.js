import React, { useState } from 'react'
import ViewPopup from '../ViewPopup'
import ViewService from './ViewServices'
import './ServicesSlider.css'

function ServicesSlider({ data }) {

    const [openPopupView, setOpenPopupView] = useState(false);
    const [currentItem, setCurrentItem] = useState("");

    return (
        <div className="services">
            <h1 className="section-title">Services</h1>
            <div className="inner">
                <div className="row">
                    {data.map((item, index) => {
                        return (
                            <div className="col" key={index}>
                                <div className="box">
                                    <img src={item.img} alt={"img " + index} onClick={() => { setOpenPopupView(true); setCurrentItem(item); }} />
                                    <div className="name">{item.name}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <ViewPopup
                title={currentItem.name}
                openPopup={openPopupView}
                setOpenPopup={setOpenPopupView}>
                <ViewService recordForView={currentItem} />
            </ViewPopup>
        </div>
    )
}

export default ServicesSlider
