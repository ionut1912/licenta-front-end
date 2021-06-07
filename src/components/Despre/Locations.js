import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import { useInView } from 'react-intersection-observer'
import { useAnimation, motion } from 'framer-motion'

const useStyles = makeStyles(theme => ({
  map: {
    background: '#fff',
    padding: '40px 0px',
    margin: '20px'
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

  //animation
  const animation = useAnimation();
  const [contentRef, inView] = useInView({
    triggerOnce: true,
  })

  const titleAnim = {
    hidden: {
      y: 100,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'tween', delay: 0.5, duration: 0.5 }
    }
  }

  const mapAnim = {
    hidden: {
      x: -120,
      opacity: 0
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: 'tween', delay: 0.9, duration: 0.9 }
    }
  }


  useEffect(() => {
    if (inView)
      animation.start('visible')

  }, [animation, inView])

  return (
    <div className={classes.map} ref={contentRef} >
      <motion.h1 className="section-title"
        variants={titleAnim} animate={animation} initial="hidden">
        Locations
        </motion.h1>
      <div className="container" style={{ padding: '30px 0' }}>
        <motion.iframe
          variants={mapAnim} animate={animation} initial="hidden"
          className={classes.frame} src="https://www.google.com.qa/maps/d/u/0/embed?mid=1y8f94yVaPDnNB8Ve8LreG86Bq3qfvBx2" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" height="520" title="map"></motion.iframe>
      </div>
    </div>
  )
}

