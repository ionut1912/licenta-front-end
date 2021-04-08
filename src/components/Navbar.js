import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import logo from '../images/logo.png';
import Login from './Login';
import AuthService from "../services/auth.service";

import './Navbar.css';

function Navbar(props) {

  let history = useHistory();

  const currentUser = AuthService.getCurrentUser();

  const currentPath = window.location.pathname;

  const [clickForNavbar, setClickForNavBar] = useState(false);
  const [button, setButton] = useState(true);

  const [show, setShow] = useState(false);
  const closeModalHandler = () => setShow(false);


  const handleClickNavbar = () => {
    if (props.setClickForSidebar != undefined)
      props.setClickForSidebar(false);
    setClickForNavBar(!clickForNavbar);
  }
  const handleClickSidebar = () => {
    setClickForNavBar(false);
    if (props.setClickForSidebar != undefined)
      props.setClickForSidebar(!props.clickForSidebar);
  }
  const closeMobileMenu = () => setClickForNavBar(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
      if (props.setClickForSidebar != undefined)
        props.setClickForSidebar(false);
    } else {
      setButton(true);
      if (props.setClickForSidebar != undefined)
        props.setClickForSidebar(true);

    }
  };

  useEffect(() => {
    showButton();
  }, []);

  function logOut() {
    AuthService.logout();
    history.push("/home");
    window.location.reload();
  }


  window.addEventListener('resize', showButton);

  return (

    <nav className='navbar'>
      <div className='navbar-container'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          <img src={logo} alt="logo" className="logo" />
        </Link>

        {currentPath == "/user" || currentPath == "/admin" ?
          <div className='menu-icon-sidebar' onClick={handleClickSidebar}>
            <i className={props.clickForSidebar ? 'fas fa-times' : 'fas fa-tachometer-alt'} />
          </div> : null
        }


        <div className='menu-icon-navbar' onClick={handleClickNavbar}>
          <i className={clickForNavbar ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={clickForNavbar ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Acasa
              </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/about'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Despre
              </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/jobs'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Joburi
              </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/makeCV'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              MakeCV
              </Link>
          </li>
          {currentUser ? (
            <li className='nav-item'>
              <Link
                to={currentUser.role === "ROLE_ADMIN" ? "/admin" : "/user"}
                className='nav-links'
                onClick={closeMobileMenu}
              >
                {currentUser.role === "ROLE_ADMIN" ? "Admin" : "User"}
              </Link>
            </li>
          ) : null}
          <div>
            <li className='nav-item'>
              <button className={button ? ' btn btn-light nav-links-btn  ' : 'nav-links-mobile'} onClick={() => { currentUser ? logOut() : setShow(true) }}>{currentUser ? "Log-out" : "Logheaza-te"}</button>
            </li>
          </div>

        </ul>
        {show && <Login show={show} close={closeModalHandler} />}
      </div>
    </nav>

  );
}

export default Navbar;


