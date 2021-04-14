import React, { useState, useEffect } from 'react'
import UserService from '../../services/user.service';
import AuthService from '../../services/auth.service'
import Sidebar from '../Sidebar';
import UserProfile from './UserProfile';
import UserAplications from './UserAplications';

function UserDashboard(props) {

    const [state, setState] = useState(1);
    const [aplicariUser, setAplicariUser] = useState([]);

    const nrAplicarii = aplicariUser.length;

    useEffect(() => {

        const currentUser = AuthService.getCurrentUser();

        UserService.getUserAplications(currentUser.id).then(
            response => {
                setAplicariUser(response.data);
            }
        );
    }, []);


    return (
        <div>
            <Sidebar showSidebar={props.showSidebar} setState={setState} state={state} />
            {state === 1 ? <UserProfile sideState={props.showSidebar} nrAplicarii={nrAplicarii} setState={setState} /> : null}
            {state === 2 ? <UserAplications sideState={props.showSidebar} aplicariUser={aplicariUser} /> : null}
        </div>

    )
}

export default UserDashboard

