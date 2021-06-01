import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../images/logo.png';
import Login from './Login';
import AuthService from "../services/auth.service";
import ViewPopup from './ViewPopup'
import './Navbar.css';

export default function Navbar(props) {

  let history = useHistory();

  const currentUser = AuthService.getCurrentUser();
  const currentPath = window.location.pathname;

  const { setClickForSidebar, setClickForNavBar, setShowModalNav } = props;

  const [button, setButton] = useState(true);

  const [openPopupView, setOpenPopupView] = useState(false);
  const [subTitle, setSubTitle] = useState('Sign in by entering the information below');

  const showButton = () => {

    if (window.innerWidth <= 1045) {
      setButton(false);
      if (setClickForSidebar !== undefined)
        setClickForSidebar(false);
    } else {
      setButton(true);
      setClickForNavBar(false);
      setShowModalNav(false);
      if (setClickForSidebar !== undefined)
        setClickForSidebar(true);
    }

  };

  const handleClickNavbar = () => {
    if (setClickForSidebar !== undefined)
      setClickForSidebar(false);
    setClickForNavBar(!props.clickForNavbar);
    setShowModalNav(!props.showModalNav);
  }
  const handleClickSidebar = () => {
    setClickForNavBar(false);
    setShowModalNav(false);
    if (setClickForSidebar !== undefined)
      setClickForSidebar(!props.clickForSidebar);
  }
  const closeMobileMenu = () => {
    setClickForNavBar(false);
    setShowModalNav(false);
  }

  useEffect(() => {

    if (window.innerWidth <= 1045) {
      setButton(false);
      if (setClickForSidebar !== undefined)
        setClickForSidebar(false);
    } else {
      setButton(true);
      setClickForNavBar(false);
      setShowModalNav(false);
      if (setClickForSidebar !== undefined)
        setClickForSidebar(true);
    }

  }, [setClickForSidebar, setClickForNavBar, setShowModalNav]);

  function logOut() {
    AuthService.logout();
    history.push("/home");
    window.location.reload();
  }

  window.addEventListener('resize', showButton);

  return (
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
          <i style={{ color: '#1c2237b0' }} className={props.clickForNavbar ? null : 'fas fa-bars'} />
        </div>

        <ul className={props.clickForNavbar ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item" style={props.clickForNavbar ? null : { display: 'none' }}>
            <div className='menu-icon-navbar' onClick={handleClickNavbar}>
              <i style={{ color: '#1c2237b0' }} className={props.clickForNavbar ? 'fas fa-times' : null} />
            </div>
          </li>
          <li className='nav-item'>
            <a href='/home'
              className={currentPath === '/home' || currentPath === '/' ? 'nav-links active' : 'nav-links'}
              onClick={() => { closeMobileMenu(); }}>
              Home
              </a>
          </li>
          <li className='nav-item'>
            <a
              href='/about'
              className={currentPath === '/about' ? 'nav-links active' : 'nav-links'}
              onClick={() => { closeMobileMenu(); }}
            >
              About
              </a>
          </li>
          <li className='nav-item'>
            <a
              href='/jobs'
              className={currentPath === '/jobs' ? 'nav-links active' : 'nav-links'}
              onClick={() => { closeMobileMenu(); }}>
              Jobs
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
              <button className={button ? ' btn nav-links-btn  ' : 'btn nav-links-mobile'} onClick={() => { currentUser ? logOut() : setOpenPopupView(true) }}>{currentUser ? "Log-out" : "Logheaza-te"}</button>
            </li>
          </div>
        </ul>
        <ViewPopup
          title='Welcome'
          subTitle={subTitle}
          openPopup={openPopupView}
          setOpenPopup={setOpenPopupView}
          showLogin={true}>
          <Login setSubTitle={setSubTitle} />
        </ViewPopup>
      </div>
    </nav>
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