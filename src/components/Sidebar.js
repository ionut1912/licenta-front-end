import React from 'react'
import * as CgIcons from 'react-icons/cg';
import * as IoIcons from 'react-icons/io';
import * as FaIcons from 'react-icons/fa';
import * as VscIcons from 'react-icons/vsc';
import * as AiIcons from 'react-icons/ai';
import './Sidebar.css';

export default function Sidebar(props) {

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
            <li className="nav-text" onClick={() => { props.setState(1); props.setItemForEdit(''); }}>
              <p className={props.state === 1 ? "selected" : null}>
                <VscIcons.VscGraph />
                <span>Statistics</span>
              </p>
            </li>

            <li className="nav-text" onClick={() => { props.setState(2); props.setItemForEdit(''); }}>
              <p className={props.state === 2 ? "selected" : null}>
                <FaIcons.FaUsersCog />
                <span>Users</span>
              </p>
            </li>

            <li className="nav-text" onClick={() => { props.setState(3); props.setItemForEdit(''); }}>
              <p className={props.state === 3 ? "selected" : null}>
                <i className="fas fa-briefcase"></i>
                <span>Jobs</span>
              </p>
            </li>

            <li className="nav-text" onClick={() => { props.setState(4); props.setItemForEdit(''); }}>
              <p className={props.state === 4 ? "selected" : null}>
                <i className="fas fa-briefcase"></i>
                <span>Create job</span>
              </p>
            </li>

            <li className="nav-text" onClick={() => { props.setState(5); props.setItemForEdit(''); }}>
              <p className={props.state === 5 ? "selected" : null}>
                <IoIcons.IoIosPaper />
                <span>Aplications</span>
              </p>
            </li>

            <li className="nav-text" onClick={() => { props.setState(6); props.setItemForEdit(''); }}>
              <p className={props.state === 6 ? "selected" : null}>
                <FaIcons.FaAddressCard />
                <span>Cvs</span>
              </p>
            </li>

            <li className="nav-text" onClick={() => { props.setState(7); props.setItemForEdit(''); }}>
              <p className={props.state === 7 ? "selected" : null}>
                <AiIcons.AiOutlineFileAdd />
                <span>Create cv</span>
              </p>
            </li>

          </ul>
        )
        }

      </nav>
    </div>
  )
}

