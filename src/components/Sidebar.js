import React, { useState , useEffect} from 'react'
import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';

import './Sidebar.css';
function Sidebar(props) {

    return (
      
        <div className="sidebar">
        <IconContext.Provider value={{ color: '#fff' }}>
          <nav className={props.showSidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' >
              <li className='navbar-toggle'>
                <Link to='#' className='menu-bars'>
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </IconContext.Provider>
      </div>
    )
}

export default Sidebar
{/* <i className='fas fa-bars'  onClick={showSidebar}/> */ }