import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
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

  return (
    <>
      <Router>
        <Navbar clickForSidebar={click} setClickForSidebar={setClick} />
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
