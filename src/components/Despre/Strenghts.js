import React, { useState } from 'react'
import './Strenghts.css'

function Strenghts({ strenghts }) {

    const [current, setCurrent] = useState(0);

    if (!Array.isArray(strenghts) || strenghts.length <= 0) {
        return null;
    }
    return (
        <div className="bg-gray">
           <h1 className="title">Our strenghts</h1>
            <div className="strengths container">
                <div data-target="#list-strenghts" className="description">
                    {strenghts.map((strenght, index) => {
                        return (
                            <div>
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
                            <a className={index === current ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action '} href="#list-exemple" onClick={() => { setCurrent(index) }} >{strenght.title}</a>
                        );
                    })}
                </div>

            </div>
        </div>
    )
}

export default Strenghts;
