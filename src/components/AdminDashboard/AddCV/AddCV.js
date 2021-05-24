import React from 'react'
import MakeCv from '../../CV/MakeCV'

export default function AddCV(props) {
    return (
        <div className={props.sideState === true && window.innerWidth > 960 ? "dash-on dash-content" : "dash-content"} style={{padding:'0px'}}>
            <MakeCv addCv={true} />
        </div>
    )
}

