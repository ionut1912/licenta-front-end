import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import HideBackgroundForNav from './components/HideBackgroundForNav'
import Navbar from './components/Navbar'
import About from './components/pages/About';
import Jobs from './components/pages/Jobs';
import User from './components/pages/User';
import Admin from './components/pages/Admin';
import NotFound from './components/pages/NotFound';
import PrivateRouteAdmin from './components/PrivateRouteAdmin';
import PrivateRouteUser from './components/PrivateRouteUser';
import authService from './services/auth.service';
import CVMaker from './components/pages/CVMaker';
import './App.css';
import ScrollTop from './components/ScrollTop';

export default function App() {

  const loggedIn = authService.getCurrentUser();
  const [showModalNav, setShowModalNav] = useState(false);
  const [clickForSidebar, setClickForSidebar] = useState(false);
  const [clickForNavbar, setClickForNavBar] = useState(false);


  return (
    <>
      <Router>
        <HideBackgroundForNav showModalNav={showModalNav} setShowModalNav={setShowModalNav} setClickForNavBar={setClickForNavBar} setClickForSideBar={setClickForSidebar} />
        <Navbar clickForSidebar={clickForSidebar} setClickForSidebar={setClickForSidebar} setShowModalNav={setShowModalNav}
          showModalNav={showModalNav} setClickForNavBar={setClickForNavBar} clickForNavbar={clickForNavbar} />
        <Switch>
          <Route path={["/", "/home"]} exact component={Home} />
          <Route path='/about' component={About} />
          <Route path='/jobs' component={Jobs} />
          <PrivateRouteAdmin path='/admin' loggedIn={loggedIn} clickForSidebar={clickForSidebar} component={Admin} />
          <PrivateRouteUser path='/user' loggedIn={loggedIn} clickForSidebar={clickForSidebar} component={User} />
          <Route path="/makeCV" component={CVMaker} />
          <Route component={NotFound} />
        </Switch>
        <ScrollTop />
      </Router>
    </>
  );
}

