import React, { useState } from 'react'
import Sidebar from '../Sidebar';
import AuthService from '../../services/auth.service'
import Statistics from './Statistics/Statistics';
import UsersList from './Users/UsersList';
import JobsList from './Jobs/JobsList';
import Aplications from './Aplications/Aplications';
import CVList from './AllCV/CVList';
import NewEditJob from './AddJob/NewEditJob';
import AddCV from './AddCV/AddCV';

function AdminDashboard(props) {

    const [state, setState] = useState(1);
    const [itemForEdit, setItemForEdit] = useState('');
    const currentUserGrad = useState(AuthService.getCurrentUser().role);


    return (
        <div>
            <Sidebar showSidebar={props.showSidebar} setState={setState} state={state} gradUser={currentUserGrad} setItemForEdit={setItemForEdit} />
            {state === 1 ? <Statistics sideState={props.showSidebar} /> : null}
            {state === 2 ? <UsersList sideState={props.showSidebar} /> : null}
            {state === 3 ? <JobsList sideState={props.showSidebar} setState={setState} setItemForEdit={setItemForEdit} /> : null}
            {state === 4 ? <NewEditJob sideState={props.showSidebar} setItemForEdit={setItemForEdit} itemForEdit={itemForEdit} /> : null}
            {state === 5 ? <Aplications sideState={props.showSidebar} /> : null}
            {state === 6 ? <CVList sideState={props.showSidebar} /> : null}
            {state === 7 ? <AddCV sideState={props.showSidebar} /> : null}
        </div>
    )
}

export default AdminDashboard
