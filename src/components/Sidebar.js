import React from 'react'
import { IconContext } from 'react-icons';
import * as CgIcons from 'react-icons/cg';
import * as IoIcons from 'react-icons/io';


import './Sidebar.css';
function Sidebar(props) {

  return (
    <div className="sidebar">
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav className={props.showSidebar ? 'nav-menu active' : 'nav-menu'}>
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
        </nav>
      </IconContext.Provider>
    </div>
  )
}

export default Sidebar

