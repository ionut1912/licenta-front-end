import React, { useState } from 'react'
import Navbar from '../Navbar'
import UserDashboard from '../UserDashboard/UserDashboard'


function User() {

  const [click, setClick] = useState(true);

  return (
    <div>
      <Navbar clickForSidebar={click} setClickForSidebar={setClick} />
      <UserDashboard showSidebar={click} />
    </div>
  )
}

export default User
