import React from 'react'
import { motion } from "framer-motion";

export default function NotFound() {
    // animation
    const contentAnim = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: { type: 'spring', delay: 0.6, duration: 0.6 }
        }
    }

    return (
        <motion.div variants={contentAnim} initial='hidden' animate='visible'
            className="text-center" style={{ padding: "180px" }}>
            <h1 style={{ fontSize: "5rem" }}>404 Not Found</h1>
            <a href="/home" style={{ fontSize: "1.5rem" }}>Link to home</a>
        </motion.div>
    )
}


