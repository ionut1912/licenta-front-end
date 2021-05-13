import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  map: {
    background: '#fff',
    padding: '40px 0px',
    margin:'20px'
  },
  frame: {
    width: '100%',
    border: 'none',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.411), 0 2px 10px rgba(0, 0, 0, 0.24)',
    borderRadius: '5px'
  }
}))

export default function Locations() {

  const classes = useStyles();

  return (
    <div className={classes.map} >
      <h1 className="section-title">Locations</h1>
      <div className="container" style={{padding:'30px 0'}}>
        <iframe className={classes.frame} src="https://www.google.com.qa/maps/d/u/0/embed?mid=1y8f94yVaPDnNB8Ve8LreG86Bq3qfvBx2" height="520" title="map"></iframe>
      </div>
    </div>
  )
}

