import React, { useState } from 'react'
import DoneAllIcon from '@material-ui/icons/DoneAll';
import './Strenghts.css'

export default function Strenghts({ strenghts }) {

    const [current, setCurrent] = useState(0);

    return (
        <div className="strenghts-section">
            <h1 className="section-title" style={{ color: '#fff', marginBottom: '20px' }}>Our strenghts</h1>
            <div className="strengths container">

                <div className="row">
                    {strenghts.map((strenght, index) => {
                        return (
                            <div key={index} className={index === current ? "strength-col-logo active" : "strength-col-logo "} onClick={() => { setCurrent(index) }}>
                                <img src={strenght.logo} className="strength-logo" />
                                <p className="strength-title">{strenght.title}</p>
                            </div>
                        )
                    })}
                </div>

                {strenghts.map((strenght, index) => {
                    return (
                        <div key={index}>
                            {index === current &&
                                <div className="strength-row-details" >

                                    <div className="strength-col-details">
                                        <div className="strength-description">
                                            <ul>
                                                {strenght.text.map((item, nr) => {
                                                    return (
                                                        <li className='list-item' key={nr}>
                                                            <span style={item[0] === '-' ? { marginRight: '50px' } : null}>
                                                                {item[0] === '-' ? null : <DoneAllIcon />}
                                                            </span>
                                                            {item}
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="strength-col-details">
                                        <img src={strenght.img} alt={"img " + index} className="strength-img" />
                                    </div>

                                </div>
                            }
                        </div>
                    )
                })}


            </div>
        </div>
    )
}
