import React from 'react'
import { Redirect, Route } from 'react-router-dom';


const PrivateRouteAdmin = ({ component: Comp, loggedIn, path }) => {
    return (
        <Route
            path={path}
            render={() => {
                return loggedIn &&loggedIn.role==="ROLE_ADMIN" ? (
                    <Comp />
                ) : (
                        <Redirect
                            to={{
                                pathname: "/"
                            }}
                        />
                    );
            }}
        />
    );
};

export default PrivateRouteAdmin 
