import React from 'react'
import { Breadcrumbs } from '@material-ui/core';

import { motion } from "framer-motion";

import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import StatisticsCards from './StatisticsCards';
import StatisticsGraphics from './StatisticsGraphics';

export default function Statistics(props) {

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
            className={props.sideState === true && window.innerWidth > 960 ? "dash-on dash-content" : "dash-content"}>
            <h1 style={{ padding: "10px 0 10px 0px" }} className="title-section">Statistics</h1>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                <span style={{ color: '#1c2237b0' }}>Dasboard</span>
                <span className="text-primary">Statistics</span>
            </Breadcrumbs>

            <StatisticsCards />

            <StatisticsGraphics />


        </motion.div>
    )
}


