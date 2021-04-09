import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Jobs from './components/pages/Jobs';
import User from './components/pages/User';
import Admin from './components/pages/Admin';
import NotFound from './components/pages/NotFound';
import PrivateRouteAdmin from './components/PrivateRouteAdmin';
import PrivateRouteUser from './components/PrivateRouteUser';
import './App.css';
import authService from './services/auth.service';
import CVMaker from './components/pages/CVMaker';



function App() {

  const loggedIn = authService.getCurrentUser();

  return (
    <>
      <Router>
        <Switch>
          <Route path={["/", "/home"]} exact component={Home} />
          <Route path='/about' component={About} />
          <Route path='/jobs' component={Jobs} />
          <Route path="/user"  component={User} />
          <PrivateRouteAdmin path='/admin' loggedIn={loggedIn} component={Admin} />
          <Route path="/makeCV" component={CVMaker} />
          <Route component={NotFound} />
        </Switch>
      </Router>

    </>
  );
}

export default App;
