import React from 'react'
import AdminDashboard from '../AdminDashboard/AdminDashboard'

function Admin(props) {
    return (
        <AdminDashboard showSidebar={props.click} />
    )
}

export default Admin