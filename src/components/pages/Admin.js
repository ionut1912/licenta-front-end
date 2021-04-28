import React, { useState } from 'react'
import AdminDashboard from '../AdminDashboard/AdminDashboard'
import Navbar from '../Navbar'

function Admin() {

    const [click, setClick] = useState(true);

    return (
        <div>
            <Navbar clickForSidebar={click} setClickForSidebar={setClick} />
            <AdminDashboard showSidebar={click} />
        </div>
    )
}

export default Admin