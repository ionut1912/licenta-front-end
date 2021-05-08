import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../images/logo.png';
import Login from './Login';
import AuthService from "../services/auth.service";
import './Navbar.css';

export default function Navbar(props) {

  let history = useHistory();

  const currentUser = AuthService.getCurrentUser();
  const currentPath = window.location.pathname;

  const [clickForNavbar, setClickForNavBar] = useState(false);
  const [button, setButton] = useState(true);

  const [showLogin, setShowLogin] = useState(false);
  const closeLogin = () => setShowLogin(false);

  const [showModalNav, setShowModalNav] = useState(false);
  const closeModalNav = () => {
    setShowModalNav(false);
    setClickForNavBar(false);
  }

  const handleClickNavbar = () => {
    if (props.setClickForSidebar !== undefined)
      props.setClickForSidebar(false);
    setClickForNavBar(!clickForNavbar);
    setShowModalNav(!showModalNav);
  }
  const handleClickSidebar = () => {
    setClickForNavBar(false);
    setShowModalNav(false);
    if (props.setClickForSidebar !== undefined)
      props.setClickForSidebar(!props.clickForSidebar);
  }
  const closeMobileMenu = () => {
    setClickForNavBar(false);
    setShowModalNav(false);
  }

  const showButton = () => {
    if (window.innerWidth <= 1045) {
      setButton(false);
      if (props.setClickForSidebar !== undefined)
        props.setClickForSidebar(false);
    } else {
      setButton(true);
      setClickForNavBar(false);
      setShowModalNav(false);
      if (props.setClickForSidebar !== undefined)
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
    <div>
      <div className="back-drop" style={{
        transform: showModalNav ? 'translateY(0vh)' : 'translateY(-100vh)',
      }} onClick={closeModalNav} />

      <nav className='navbar'>
        <div className='navbar-container'>
          <a href='/home' className='navbar-logo' onClick={() => { closeMobileMenu(); }}>
            <img src={logo} alt="logo" className="logo" />
          </a>

          {currentPath === "/user" || currentPath === "/admin" ?
            <div className='menu-icon-sidebar' onClick={handleClickSidebar}>
              <i style={{ color: '#1c2237b0' }} className={props.clickForSidebar ? 'fas fa-times' : 'fas fa-tachometer-alt'} />
            </div> : null
          }

          <div className='menu-icon-navbar' onClick={() => { handleClickNavbar(); }}>
            <i style={{ color: '#1c2237b0' }} className={clickForNavbar ? null : 'fas fa-bars'} />
          </div>

          <ul className={clickForNavbar ? 'nav-menu active' : 'nav-menu'}>
            <li className="nav-item" style={clickForNavbar ? null : { display: 'none' }}>
              <div className='menu-icon-navbar' onClick={handleClickNavbar}>
                <i style={{ color: '#1c2237b0' }} className={clickForNavbar ? 'fas fa-times' : null} />
              </div>
            </li>
            <li className='nav-item'>
              <a href='/home'
                className={currentPath === '/home' ? 'nav-links active' : 'nav-links'}
                onClick={() => { closeMobileMenu(); }}>
                Acasa
              </a>
            </li>
            <li className='nav-item'>
              <a
                href='/about'
                className={currentPath === '/about' ? 'nav-links active' : 'nav-links'}
                onClick={() => { closeMobileMenu(); }}
              >
                Despre
              </a>
            </li>
            <li className='nav-item'>
              <a
                href='/jobs'
                className={currentPath === '/jobs' ? 'nav-links active' : 'nav-links'}
                onClick={() => { closeMobileMenu(); }}>
                Joburi
              </a>
            </li>
            <li className='nav-item'>
              <a
                href='/makeCV'
                className={currentPath === '/makeCV' ? 'nav-links active' : 'nav-links'}
                onClick={() => { closeMobileMenu(); }}>
                MakeCV
              </a>
            </li>
            {currentUser ? (
              <li className='nav-item'>
                <a
                  href={currentUser.role === "ROLE_ADMIN" ? "/admin" : "/user"}
                  className={currentPath === '/admin' || currentPath === '/user' ? 'nav-links active' : 'nav-links'}
                  onClick={() => { closeMobileMenu(); }}>
                  {currentUser.role === "ROLE_ADMIN" ? "Admin" : "User"}
                </a>
              </li>
            ) : null}
            <div>
              <li className='nav-item'>
                <button className={button ? ' btn nav-links-btn  ' : 'btn nav-links-mobile'} onClick={() => { currentUser ? logOut() : setShowLogin(true) }}>{currentUser ? "Log-out" : "Logheaza-te"}</button>
              </li>
            </div>
          </ul>
          {showLogin && <Login show={showLogin} close={closeLogin} />}
        </div>
      </nav>
    </div>


  );
}




// const [navbar, setNavbar] = useState(false);

 // const changeNavStyle = () => {
  //   if (window.scrollY >= 250) {
  //     setNavbar(true);
  //   } else {
  //     setNavbar(false);
  //   }
  // }

  // window.addEventListener('scroll', changeNavStyle);