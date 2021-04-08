import React from 'react'
import Navbar from '../Navbar'

function NotFound() {
    return (
        <>
            <Navbar />
            <div className="text-center" style={{ padding: "180px" }}>
                <h1 style={{ fontSize: "5rem" }}>404 Not Found</h1>
                <a href="/home" style={{ fontSize: "1.5rem" }}>Link to home</a>
            </div>
        </>
    )
}

export default NotFound
