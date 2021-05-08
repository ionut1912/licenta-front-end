import React, { useState } from 'react'
import './Strenghts.css'

function Strenghts({ strenghts }) {

    const [current, setCurrent] = useState(0);

    if (!Array.isArray(strenghts) || strenghts.length <= 0) {
        return null;
    }
    return (
        <div className="strenghts-section">
            <h1 className="section-title" style={{color:"#fff"}}>Our strenghts</h1>
            <div className="strengths container">
                <div data-target="#list-strenghts" className="description">
                    {strenghts.map((strenght, index) => {
                        return (
                            <div key={index}>
                                {index === current ? (
                                    <ul>
                                        {strenght.text.map((item, nr) => {
                                            return (
                                                <li className={index === current ? 'list-item active' : 'list-item'} key={nr}>{item}</li>
                                            );
                                        })}
                                    </ul>
                                ) : null}
                            </div>
                        )
                    })}
                </div>

                <div id="list-strenghts" className="list-group">
                    {strenghts.map((strenght, index) => {
                        return (
                            <a key={index} className={index === current ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action '} href="#list-exemple" onClick={() => { setCurrent(index) }} >{strenght.title}</a>
                        );
                    })}
                </div>

            </div>
        </div>
    )
}

export default Strenghts;
