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

function App() {

  const loggedIn = authService.getCurrentUser();
  const [click, setClick] = useState(true);
  const [showModalNav, setShowModalNav] = useState(false);
  const [clickForNavbar, setClickForNavBar] = useState(false);

  return (
    <>
      <Router>
        <HideBackgroundForNav showModalNav={showModalNav} setShowModalNav={setShowModalNav} setClickForNavBar={setClickForNavBar} />
        <Navbar clickForSidebar={click} setClickForSidebar={setClick} setShowModalNav={setShowModalNav}
          showModalNav={showModalNav} setClickForNavBar={setClickForNavBar} clickForNavbar={clickForNavbar} />
        <Switch>
          <Route path={["/", "/home"]} exact component={Home} />
          <Route path='/about' component={About} />
          <Route path='/jobs' component={Jobs} />
          <PrivateRouteAdmin path='/admin' loggedIn={loggedIn} clickForSidebar={click} component={Admin} />
          <PrivateRouteUser path='/user' loggedIn={loggedIn} clickForSidebar={click} component={User} />
          <Route path="/makeCV" component={CVMaker} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
