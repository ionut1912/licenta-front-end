import React, { useState } from 'react'
import './Strenghts.css'

export default function Strenghts({ strenghts }) {

    const [current, setCurrent] = useState(0);

    return (
        <div className="strenghts-section">
            <h1 className="section-title" style={{ color: "#fff", paddingTop: '70px', marginBottom: '20px' }}>Our strenghts</h1>
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

                <div id="list-strenghts" className="list-group" id="list-tab" role="tablist">
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

