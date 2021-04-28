import React from 'react'
import MakeCv from '../../CV/MakeCV'

export default function AddCV(props) {
    return (
        <div className={props.sideState === true && window.innerWidth > 960 ? "dash-on dash-content" : "dash-content"} style={{ backgroundColor: "#f1f1f1" }}>
            <MakeCv addCv={true} />
        </div>
    )
}

