import React from 'react'
import './Location.css'

function Locations() {

  return (

    <div id="map" >
      <h1 className="title">Locations</h1>
      <div className="container">
        <iframe className="frame" src="https://www.google.com.qa/maps/d/u/0/embed?mid=1y8f94yVaPDnNB8Ve8LreG86Bq3qfvBx2" width="640" height="520" title="map"></iframe>
      </div>
    </div>

  )
}

export default Locations
