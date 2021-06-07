import React from 'react'
import MakeCv from '../../CV/MakeCV'
import { motion } from "framer-motion";

export default function AddCV(props) {

    // animation
    const contentAnim = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: { type: 'spring', delay: 0.5, duration: 0.5 }
        }
    }

    return (
        <motion.div variants={contentAnim} initial='hidden' animate='visible'
            className={props.sideState === true && window.innerWidth > 960 ? "dash-on dash-content" : "dash-content"} style={{ padding: '0px' }}>
            <MakeCv addCv={true} setItemForEdit={props.setItemForEdit} itemForEdit={props.itemForEdit} />
        </motion.div>
    )
}

