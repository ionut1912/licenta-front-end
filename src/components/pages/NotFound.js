import React from 'react'
import { motion } from "framer-motion";
import AuthService from "../../services/auth.service";

export default function NotFound() {

    const currentUser = AuthService.getCurrentUser();


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
            <a href={currentUser && currentUser.role === "ROLE_ADMIN" ? "/admin" : "/home"} style={{ fontSize: "1.5rem" }}>Link to {currentUser && currentUser.role === "ROLE_ADMIN" ? "admin" : "home"}</a>
        </motion.div>
    )
}


