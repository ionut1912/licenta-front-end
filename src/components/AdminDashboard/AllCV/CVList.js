import React from 'react'

function CVList(props) {
    return (
        <div className={props.sideState === true && window.innerWidth > 960 ? "dash-on dash-content" : "dash-content"}>
            <h1 style={{ padding: "10px 0 10px 0px" }} className="title-section">CVList</h1>
        </div>
    )
}

export default CVList
