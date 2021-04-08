import React, { useState } from 'react'
import UserService from '../../services/user.service';
import AuthService from '../../services/auth.service'
import './UserDashboard.css'
import Sidebar from '../Sidebar';
import UserProfile from './UserProfile';

function UserDashboard(props) {

    // const [user, setUser] = useState({
    //     aplicarii: []
    // });
    // const currentUser = AuthService.getCurrentUser();
    // UserService.getUserAplicarii(currentUser.id).then(
    //     response => {
    //         setUser(response.data);
    //     }
    // );



    return (
        <div>
            <Sidebar showSidebar={props.showSidebar} />
            <UserProfile/>
        </div>



    )
}

export default UserDashboard


// { user.aplicarii.map((slide, index) => {
//     return( 
//     <div key={index}> {slide.full_name}</div>
//     )

// }
// ) }