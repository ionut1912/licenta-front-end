import React, { useState } from 'react'
import UserService from '../../services/user.service';
import AuthService from '../../services/auth.service'
import Sidebar from '../Sidebar';
import UserProfile from './UserProfile';
import UserAplications from './UserAplications';
import './UserDashboard.css'

function UserDashboard(props) {

    const [state, setState] = useState(1);

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
            <Sidebar showSidebar={props.showSidebar} setState={setState} state={state} />
            {state === 1 ? <UserProfile sideState={props.showSidebar} /> : null}
            {state === 2 ? <UserAplications sideState={props.showSidebar} /> : null}
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