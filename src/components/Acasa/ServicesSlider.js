import React,{useState} from 'react'
import {Modal} from '../Modal';
import './ServicesSlider.css'

function ServicesSlider({ data }) {

    const[show,setShow]=useState(false);
    const [currentItem,setCurrentItem]=useState(null);

    const closeModalHandler =() => setShow(false);

    return (
        <div className="services">
        {show && <Modal show={show} close={closeModalHandler} data={currentItem}/> } 
            <h1 className="section-title">Services</h1>
                <div className="inner">
                    <div className="row">
                        {data.map((item, index) => {
                            return (
                                <div className="col" key={index}>
                                    <div className="box">
                                        <img src={item.img} alt={"img " + index} onClick={() => {setShow(true); setCurrentItem(item);}} />
                                        <div className="name">{item.name}</div>           
                                    </div>
                                </div>
                            )
                        })}
                    </div>
            </div>
        </div>
    )
}

export default ServicesSlider
