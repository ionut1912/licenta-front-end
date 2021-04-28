import React from 'react'
import MakeCV from '../CV/MakeCV'
import Navbar from '../Navbar'

function CVMaker() {
    return (
        <div>
            <Navbar />
            <MakeCV addCv={false}/>
        </div>
    )
}

export default CVMaker
