import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../images/logo.png';
import Login from './Login';
import AuthService from "../services/auth.service";
import ViewPopup from './ViewPopup'
import './Navbar.css';
import { motion } from "framer-motion";

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

      setClickForNavBar(false);
      setShowModalNav(false);
    } else {
      setButton(true);
      setClickForNavBar(false);
      setShowModalNav(false);
      if (setClickForSidebar !== undefined)
        setClickForSidebar(true);
    }

  };

  const handleClickNavbar = () => {
    setClickForSidebar(false);
    if (setClickForSidebar !== undefined)
      setClickForNavBar(!props.clickForNavbar);
    if (props.clickForSidebar === false)
      setShowModalNav(!props.showModalNav);
  }
  const handleClickSidebar = () => {
    setClickForNavBar(false);
    if (props.clickForNavbar === false)
      setShowModalNav(!props.showModalNav);
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

      setClickForNavBar(false);
      setShowModalNav(false);
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



  // animation
  const logoAnim = {
    hidden: {
      x: -100,
      opacity: 0
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: 'tween', delay: 0.5, duration: 0.5 }
    }
  }


  const liAnim = {
    hidden: {
      y: -100,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'tween', delay: 0.7, duration: 0.7 }
    }
  }

  const iconsAnim = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { type: 'tween', delay: 0.7, duration: 0.7 }
    }
  }

  const buttonAnim = {
    hidden: {
      x: 100, opacity: 0
    },
    visible: {
      x: 0, opacity: 1,
      transition: { delay: 0.5, duration: 0.5 }
    }
  }

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <a href='/home' className='navbar-logo' onClick={() => { closeMobileMenu(); }}>
          <motion.img variants={logoAnim} initial='hidden' animate='visible'
            src={logo} alt="logo" className="logo" />
        </a>

        {currentPath === "/user" || currentPath === "/admin" ?
          <motion.div variants={iconsAnim} initial='hidden' animate='visible'
            className='menu-icon-sidebar' onClick={handleClickSidebar}>
            <i style={{ color: '#1c2237b0' }} className={props.clickForSidebar ? 'fas fa-times' : 'fas fa-tachometer-alt'} />
          </motion.div> : null
        }

        <motion.div variants={iconsAnim} initial='hidden' animate='visible'
          className='menu-icon-navbar' onClick={() => { handleClickNavbar(); }}>
          <i style={{ color: '#1c2237b0' }} className={props.clickForNavbar ? null : 'fas fa-bars'} />
        </motion.div>

        <ul className={props.clickForNavbar ? 'nav-menu active' : 'nav-menu'}>
          <li
            className="nav-item" style={props.clickForNavbar ? null : { display: 'none' }}>
            <div className='menu-icon-navbar' onClick={handleClickNavbar}>
              <i style={{ color: '#1c2237b0' }} className={props.clickForNavbar ? 'fas fa-times' : null} />
            </div>
          </li>
          <motion.li variants={liAnim} initial='hidden' animate='visible' className='nav-item'>
            <a href='/home'
              className={currentPath === '/home' || currentPath === '/' ? 'nav-links active' : 'nav-links'}
              onClick={() => { closeMobileMenu(); }}>
              Home
              </a>
          </motion.li>
          <motion.li variants={liAnim} initial='hidden' animate='visible' className='nav-item'>
            <a
              href='/about'
              className={currentPath === '/about' ? 'nav-links active' : 'nav-links'}
              onClick={() => { closeMobileMenu(); }}
            >
              About
              </a>
          </motion.li>
          <motion.li variants={liAnim} initial='hidden' animate='visible' className='nav-item'>
            <a
              href='/jobs'
              className={currentPath === '/jobs' ? 'nav-links active' : 'nav-links'}
              onClick={() => { closeMobileMenu(); }}>
              Jobs
              </a>
          </motion.li>
          <motion.li variants={liAnim} initial='hidden' animate='visible' className='nav-item'>
            <a
              href='/makeCV'
              className={currentPath === '/makeCV' ? 'nav-links active' : 'nav-links'}
              onClick={() => { closeMobileMenu(); }}>
              Make cv
              </a>
          </motion.li>
          {currentUser ? (
            <motion.li variants={liAnim} initial='hidden' animate='visible' className='nav-item'>
              <a
                href={currentUser.role === "ROLE_ADMIN" ? "/admin" : "/user"}
                className={currentPath === '/admin' || currentPath === '/user' ? 'nav-links active' : 'nav-links'}
                onClick={() => { closeMobileMenu(); }}>
                {currentUser.role === "ROLE_ADMIN" ? "Admin" : "User"}
              </a>
            </motion.li>
          ) : null}
          <div>
            <motion.li variants={buttonAnim} initial='hidden' animate='visible' className='nav-item'>
              <button className={button ? ' btn nav-links-btn  ' : 'btn nav-links-mobile'} onClick={() => { currentUser ? logOut() : setOpenPopupView(true) }}>{currentUser ? "Log-out" : "Logheaza-te"}</button>
            </motion.li>
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