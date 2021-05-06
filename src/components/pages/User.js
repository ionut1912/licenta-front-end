import React from 'react'
import UserDashboard from '../UserDashboard/UserDashboard'


function User(props) {
  return (
    <UserDashboard showSidebar={props.click} />
  )
}

export default User
