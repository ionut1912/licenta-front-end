import React from 'react'
import * as CgIcons from 'react-icons/cg';
import * as IoIcons from 'react-icons/io';
import * as FaIcons from 'react-icons/fa';
import * as VscIcons from 'react-icons/vsc';
import * as AiIcons from 'react-icons/ai';
import './Sidebar.css';
import AuthService from "../services/auth.service";
import { useHistory } from 'react-router-dom';

export default function Sidebar(props) {

  let history = useHistory();

  const currentUser = AuthService.getCurrentUser();

  function logOut() {
    AuthService.logout();
    history.push("/home");
    window.location.reload();
  }

  return (
    <div className="sidebar">
      <nav className={props.showSidebar ? 'nav-menu active' : 'nav-menu'}>

        {props.gradUser === "ROLE_USER" ? (
          <ul className='nav-menu-items' >
            <li className="nav-text" onClick={() => props.setState(1)}>
              <p className={props.state === 1 ? "selected" : null}>
                <CgIcons.CgProfile />
                <span>Profile</span>
              </p>
            </li>

            <li className="nav-text" onClick={() => props.setState(2)}>
              <p className={props.state === 2 ? "selected" : null}>
                <IoIcons.IoIosPaper />
                <span>Aplications</span>
              </p>
            </li>
          </ul>
        ) : (
          <ul className='nav-menu-items' >
            <li className="nav-text" onClick={() => { props.setState(1); props.setItemForEdit(''); props.setShowApplcations(''); }}>
              <p className={props.state === 1 ? "selected" : null}>
                <VscIcons.VscGraph />
                <span>Statistics</span>
              </p>
            </li>

            <li className="nav-text" onClick={() => { props.setState(2); props.setItemForEdit(''); props.setShowApplcations(''); }}>
              <p className={props.state === 2 ? "selected" : null}>
                <FaIcons.FaUsersCog />
                <span>Users</span>
              </p>
            </li>

            <li className="nav-text" onClick={() => { props.setState(3); props.setItemForEdit(''); props.setShowApplcations(''); }}>
              <p className={props.state === 3 ? "selected" : null}>
                <i className="fas fa-briefcase"></i>
                <span>Jobs</span>
              </p>
            </li>

            <li className="nav-text" onClick={() => { props.setState(4); props.setItemForEdit(''); props.setShowApplcations(''); }}>
              <p className={props.state === 4 ? "selected" : null}>
                <i className="fas fa-briefcase"></i>
                <span>Create job</span>
              </p>
            </li>

            <li className="nav-text" onClick={() => { props.setState(5); props.setItemForEdit(''); props.setShowApplcations(''); }}>
              <p className={props.state === 5 ? "selected" : null}>
                <IoIcons.IoIosPaper />
                <span>Applications</span>
              </p>
            </li>

            <li className="nav-text" onClick={() => { props.setState(6); props.setItemForEdit(''); props.setShowApplcations(''); }}>
              <p className={props.state === 6 ? "selected" : null}>
                <FaIcons.FaAddressCard />
                <span>Cvs</span>
              </p>
            </li>

            <li className="nav-text" onClick={() => { props.setState(7); props.setItemForEdit(''); props.setShowApplcations(''); }}>
              <p className={props.state === 7 ? "selected" : null}>
                <AiIcons.AiOutlineFileAdd />
                <span>Create cv</span>
              </p>
            </li>

            {currentUser !== null && currentUser.role === "ROLE_ADMIN" && window.innerWidth <= 1045 ? <li className="nav-text">
              <button className='btn log-out' onClick={() => logOut()}>Log-out</button>
            </li> : null}

          </ul>
        )
        }

      </nav>
    </div>
  )
}

