import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  const [statePage, setStatePage] = useState(1);

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
          <Link to='/home' className='navbar-logo' onClick={() => { setStatePage(1); closeMobileMenu(); }}>
            <img src={logo} alt="logo" className="logo" />
          </Link>

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
              <Link to='/home'
                className={statePage === 1 ? 'nav-links active' : 'nav-links'}
                onClick={() => { setStatePage(1); closeMobileMenu(); }}>
                Acasa
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/about'
                className={statePage === 2 ? 'nav-links active' : 'nav-links'}
                onClick={() => { setStatePage(2); closeMobileMenu(); }}
              >
                Despre
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/jobs'
                className={statePage === 3 ? 'nav-links active' : 'nav-links'}
                onClick={() => { setStatePage(3); closeMobileMenu(); }}>
                Joburi
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/makeCV'
                className={statePage === 4 ? 'nav-links active' : 'nav-links'}
                onClick={() => { setStatePage(4); closeMobileMenu(); }}>
                MakeCV
              </Link>
            </li>
            {currentUser ? (
              <li className='nav-item'>
                <Link
                  to={currentUser.role === "ROLE_ADMIN" ? "/admin" : "/user"}
                  className={statePage === 5 ? 'nav-links active' : 'nav-links'}
                  onClick={() => { setStatePage(5); closeMobileMenu(); }}>
                  {currentUser.role === "ROLE_ADMIN" ? "Admin" : "User"}
                </Link>
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